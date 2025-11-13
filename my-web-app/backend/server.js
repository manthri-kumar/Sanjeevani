
// ==========================================================
// IMPORTS
// ==========================================================
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// ==========================================================
// APP INITIALIZATION
// ==========================================================
const app = express();

app.use(express.json());

// ==========================================================
// CORS CONFIGURATION
// ==========================================================
// ✅ Allows both local dev & Render deployed frontend
app.use(
  cors({
    origin: [
      "http://localhost:3000",             // local development
      "https://sanjeevani.onrender.com",   // deployed frontend URL
    ],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

// ==========================================================
// DATABASE CONNECTION (POOL)
// ==========================================================
// ⚠️ NOTE: When deploying, localhost DB won't work.
// You’ll need a cloud DB (e.g., Render PostgreSQL, Railway MySQL, etc.)
const db = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "kumar2005",
  database: process.env.MYSQLDATABASE || "sanjeevani",
  port: process.env.MYSQLPORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Pool connection error:", err.message);
  } else {
    console.log("✅ MySQL connected (Pool established)");
    connection.release();
  }
});

// ==========================================================
// TEST ROUTE
// ==========================================================
app.get("/", (req, res) => {
  res.send("✅ Sanjeevani Backend is Running Successfully!");
});

// ==========================================================
// USER AUTHENTICATION ROUTES (SIGNUP + LOGIN)
// ==========================================================

// 🟢 SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error("❌ Error checking user:", err);
        return res
          .status(500)
          .json({ success: false, message: "Database error" });
      }

      if (results.length > 0) {
        return res
          .status(400)
          .json({ success: false, message: "User already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const insertQuery =
        "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
      db.query(insertQuery, [username, email, hashedPassword], (err) => {
        if (err) {
          console.error("❌ Signup Error:", err);
          return res
            .status(500)
            .json({ success: false, message: "Error creating user" });
        }
        res.status(200).json({ success: true, message: "Signup successful" });
      });
    });
  } catch (err) {
    console.error("❌ Server Error (Signup):", err);
    res
      .status(500)
      .json({ success: false, message: "Server error during signup" });
  }
});

// 🔵 LOGIN ROUTE
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("❌ Login Error:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error during login" });
    }

    if (results.length === 0)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    const user = results[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
    });
  });
});

// ==========================================================
// BLOOD BANK ROUTES
// ==========================================================

// GET /api/states - Retrieves all states
app.get("/api/states", (req, res) => {
  db.query(
    "SELECT state_id, state_name FROM states ORDER BY state_name",
    (err, results) => {
      if (err) {
        console.error("❌ Error fetching states:", err);
        return res
          .status(500)
          .json({ success: false, message: "Database error fetching states" });
      }
      res.json(results);
    }
  );
});

// GET /api/districts/:stateId - Retrieves districts of a state
app.get("/api/districts/:stateId", (req, res) => {
  const { stateId } = req.params;
  db.query(
    "SELECT district_id, district_name FROM districts WHERE state_id=? ORDER BY district_name",
    [stateId],
    (err, results) => {
      if (err) {
        console.error("❌ Error fetching districts:", err);
        return res
          .status(500)
          .json({
            success: false,
            message: "Database error fetching districts",
          });
      }
      res.json(results);
    }
  );
});

// POST /api/blood-banks/search - Search by district
app.post("/api/blood-banks/search", (req, res) => {
  const { districtId } = req.body;
  if (!districtId)
    return res
      .status(400)
      .json({ success: false, message: "District ID required" });

  const query = `
        SELECT BB.bank_id AS id, BB.bank_name AS name, BB.address, BB.category,
        BB.bank_type AS type, DATE_FORMAT(BB.last_updated,'%Y-%m-%d %H:%i:%s') AS updated,
        (SELECT GROUP_CONCAT(blood_group, ':', units_available)
         FROM availability WHERE bank_id=BB.bank_id) AS availability
        FROM blood_banks BB WHERE BB.district_id=? 
        ORDER BY BB.category DESC, BB.bank_name ASC
    `;

  db.query(query, [districtId], (err, results) => {
    if (err) {
      console.error("❌ Error during blood bank search:", err);
      return res
        .status(500)
        .json({ success: false, message: "Database error during search" });
    }
    res.json(results);
  });
});

// POST /api/blood-banks/nearest - Find nearest blood banks
app.post("/api/blood-banks/nearest", (req, res) => {
  const { latitude, longitude, radius = 50 } = req.body;

  if (!latitude || !longitude)
    return res
      .status(400)
      .json({
        success: false,
        message: "Latitude and longitude are required",
      });

  const query = `
        SELECT
            BB.bank_id AS id,
            BB.bank_name AS name,
            BB.address,
            BB.category,
            BB.bank_type AS type,
            DATE_FORMAT(BB.last_updated, '%Y-%m-%d %H:%i:%s') AS updated,
            (6371 * acos(
                cos(radians(?)) * cos(radians(BB.latitude)) * 
                cos(radians(BB.longitude) - radians(?)) + 
                sin(radians(?)) * sin(radians(BB.latitude))
            )) AS distance_km,
            (
                SELECT GROUP_CONCAT(blood_group, ':', units_available)
                FROM availability A
                WHERE A.bank_id = BB.bank_id
            ) AS availability
        FROM blood_banks BB
        HAVING distance_km < ?  
        ORDER BY distance_km ASC
        LIMIT 10;
    `;

  const params = [latitude, longitude, latitude, radius];

  db.query(query, params, (err, results) => {
    if (err) {
      console.error("❌ Error during nearest blood bank search:", err);
      return res
        .status(500)
        .json({
          success: false,
          message: "Database error during radius search",
        });
    }
    res.json(results);
  });
});
// GET user data (profile + cart + appointments)
app.get("/api/user/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    const [user] = await db.promise().query("SELECT * FROM users WHERE id = ?", [userId]);
    const [cart] = await db.promise().query("SELECT * FROM cart_items WHERE user_id = ?", [userId]);
    const [appointments] = await db.promise().query("SELECT * FROM appointments WHERE user_id = ?", [userId]);

    res.json({
      success: true,
      user: user[0],
      cart,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
// ==========================================================
// DOCTOR SIGNUP (CLEAN AND CORRECT)
// ==========================================================
app.post("/api/doctor/signup", async (req, res) => {
  const { name, email, specialist, experience, password } = req.body;

  if (!name || !email || !specialist || !experience || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if doctor already exists
    const checkQuery = "SELECT * FROM doctors WHERE email = ?";
    db.query(checkQuery, [email], async (err, results) => {
      if (err) {
        console.error("Signup error:", err);
        return res.json({ success: false, message: "Database error" });
      }

      if (results.length > 0) {
        return res.json({ success: false, message: "Doctor already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      const insertQuery = `
        INSERT INTO doctors (name, email, specialist, experience_years, password)
        VALUES (?, ?, ?, ?, ?)
      `;

      db.query(
        insertQuery,
        [name, email, specialist, experience, hashedPassword],
        (err) => {
          if (err) {
            console.error("Doctor signup error:", err);
            return res.json({
              success: false,
              message: "Error registering doctor",
            });
          }

          res.json({
            success: true,
            message: "Doctor registered successfully! Please log in.",
          });
        }
      );
    });
  } catch (error) {
    console.error("Server Error (Doctor Signup):", error);
    res.json({ success: false, message: "Server error" });
  }
});

// ==========================================================
// DOCTOR LOGIN (CLEAN AND CORRECT)
// ==========================================================
app.post("/api/doctor/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ success: false, message: "Email and password required" });

  const query = "SELECT * FROM doctors WHERE email = ?";

  db.query(query, [email], async (err, results) => {
    if (err) {
      console.error("Doctor login error:", err);
      return res.json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    const doctor = results[0];

    // Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, doctor.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: "Incorrect password" });
    }

    res.json({
      success: true,
      message: "Doctor login successful!",
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialist: doctor.specialist,
        experience: doctor.experience_years,
      },
    });
    app.post("/api/appointments/book", (req, res) => {
  const { user_id, doctor_id, date, time } = req.body;

  if (!user_id || !doctor_id || !date || !time) {
    return res.json({ success: false, message: "Missing fields" });
  }

  const appointmentDateTime = `${date} ${time}`;

  const query = `
    INSERT INTO appointments (user_id, doctor_id, appointment_time)
    VALUES (?, ?, ?)
  `;

  db.query(query, [user_id, doctor_id, appointmentDateTime], (err, result) => {
    if (err) {
      console.error("Error inserting appointment:", err);
      return res.json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Appointment booked successfully!" });
  });
});

app.get("/api/appointments/:userId", (req, res) => {
  const userId = req.params.userId;

  const query = `
    SELECT a.id, a.appointment_time, a.status,
           d.name AS doctor_name, d.specialist AS specialization
    FROM appointments a
    LEFT JOIN doctors d ON a.doctor_id = d.id
    WHERE a.user_id = ?
    ORDER BY a.appointment_time DESC
  `;

  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.json({ success: false, message: "Database error" });
    }

    res.json({ success: true, appointments: results });
  });
});

  });
});




// ==========================================================
// START SERVER (Render + Local)
// ==========================================================
// ==========================================================
// START SERVER (Render + Local)
// ==========================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
