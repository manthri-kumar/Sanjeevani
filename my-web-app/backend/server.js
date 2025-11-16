// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

// -------------------- CORS --------------------
app.use(
  cors({
    origin: ["http://localhost:3000", "https://sanjeevani.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// -------------------- MySQL --------------------
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "kumar2005",
  database: process.env.DB_NAME || "sanjeevani",
  waitForConnections: true,
  connectionLimit: 10,
});

db.getConnection((err, conn) => {
  if (err) console.error("MySQL Error:", err);
  else {
    console.log("MySQL connected");
    conn.release();
  }
});

// -------------------- Helpers --------------------
const sendServerError = (res, err, msg) => {
  console.error(msg, err);
  return res.status(500).json({ success: false, message: msg });
};

// -------------------- Root --------------------
app.get("/", (req, res) => {
  res.send("Backend Running Successfully!");
});

// -------------------- USER SIGNUP --------------------
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.json({ success: false, message: "All fields required" });

    const [exists] = await db
      .promise()
      .query("SELECT id FROM users WHERE email = ?", [email]);

    if (exists.length > 0)
      return res.json({ success: false, message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await db
      .promise()
      .query("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", [
        username,
        email,
        hashed,
      ]);

    return res.json({ success: true, message: "Signup successful!" });
  } catch (err) {
    return sendServerError(res, err, "Signup error");
  }
});

// -------------------- USER LOGIN --------------------
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0)
      return res.json({ success: false, message: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.json({ success: false, message: "Incorrect password" });

    return res.json({
      success: true,
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    return sendServerError(res, err, "Login error");
  }
});

// ------------------------------------------------------------
//                     DOCTOR AUTH
// ------------------------------------------------------------
app.post("/api/doctor/signup", async (req, res) => {
  try {
    const { name, email, specialist, experience, password } = req.body;

    if (!name || !email || !specialist || experience == null || !password)
      return res.json({ success: false, message: "All fields required" });

    const [exists] = await db
      .promise()
      .query("SELECT id FROM doctors WHERE email = ?", [email]);

    if (exists.length > 0)
      return res.json({ success: false, message: "Doctor already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await db.promise().query(
      "INSERT INTO doctors (name, email, specialist, experience_years, password) VALUES (?, ?, ?, ?, ?)",
      [name, email, specialist, experience, hashed]
    );

    return res.json({ success: true, message: "Doctor registered!" });
  } catch (err) {
    return sendServerError(res, err, "Doctor signup error");
  }
});

app.post("/api/doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.promise().query("SELECT * FROM doctors WHERE email = ?", [email]);

    if (rows.length === 0)
      return res.json({ success: false, message: "Doctor not found" });

    const doctor = rows[0];

    const match = await bcrypt.compare(password, doctor.password);

    if (!match)
      return res.json({ success: false, message: "Incorrect password" });

    return res.json({
      success: true,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialist: doctor.specialist,
        experience: doctor.experience_years,
      },
    });
  } catch (err) {
    return sendServerError(res, err, "Doctor login error");
  }
});

// ------------------------------------------------------------
//                   DOCTOR AVAILABILITY
// ------------------------------------------------------------
app.post("/api/doctor/availability", async (req, res) => {
  try {
    const { doctor_id, available_date, start_time, end_time } = req.body;

    const [exists] = await db
      .promise()
      .query(
        "SELECT id FROM doctor_availability WHERE doctor_id = ? AND available_date = ?",
        [doctor_id, available_date]
      );

    if (exists.length > 0) {
      await db.promise().query(
        "UPDATE doctor_availability SET start_time=?, end_time=? WHERE doctor_id=? AND available_date=?",
        [start_time, end_time, doctor_id, available_date]
      );
    } else {
      await db.promise().query(
        "INSERT INTO doctor_availability (doctor_id, available_date, start_time, end_time) VALUES (?, ?, ?, ?)",
        [doctor_id, available_date, start_time, end_time]
      );
    }

    return res.json({ success: true, message: "Availability saved!" });
  } catch (err) {
    return sendServerError(res, err, "Availability save error");
  }
});

app.get("/api/doctor/availability/:doctorId", async (req, res) => {
  try {
    const doctorId = req.params.doctorId;

    const [rows] = await db.promise().query(
      "SELECT available_date, start_time, end_time FROM doctor_availability WHERE doctor_id=? ORDER BY available_date",
      [doctorId]
    );

    return res.json({ success: true, availability: rows });
  } catch (err) {
    return sendServerError(res, err, "Get availability error");
  }
});

// ------------------------------------------------------------
//                   DOCTOR LIST
// ------------------------------------------------------------
app.get("/api/doctors", async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT d.id, d.name, d.specialist, d.experience_years,
             a.available_date, a.start_time, a.end_time
      FROM doctors d
      LEFT JOIN doctor_availability a ON d.id = a.doctor_id
      ORDER BY a.available_date DESC
    `);

    const map = new Map();

    rows.forEach((r) => {
      if (!map.has(r.id)) {
        map.set(r.id, {
          id: r.id,
          name: r.name,
          specialist: r.specialist,
          experience_years: r.experience_years,
          available_date: r.available_date,
          start_time: r.start_time,
          end_time: r.end_time,
        });
      }
    });

    return res.json({ success: true, doctors: Array.from(map.values()) });
  } catch (err) {
    return sendServerError(res, err, "Load doctors error");
  }
});

// ------------------------------------------------------------
//             APPOINTMENT BOOKING + FETCHING
// ------------------------------------------------------------
app.post("/api/appointments/book", async (req, res) => {
  try {
    const { user_id, doctor_id, appointment_time } = req.body;

    await db.promise().query(
      "INSERT INTO appointments (user_id, doctor_id, appointment_time, status) VALUES (?, ?, ?, ?)",
      [user_id, doctor_id, appointment_time, "Scheduled"]
    );

    return res.json({ success: true, message: "Appointment booked!" });
  } catch (err) {
    return sendServerError(res, err, "Book appointment error");
  }
});

app.get("/api/appointments/:userId", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      "SELECT * FROM appointments WHERE user_id=? ORDER BY appointment_time DESC",
      [req.params.userId]
    );

    return res.json({ success: true, appointments: rows });
  } catch (err) {
    return sendServerError(res, err, "Get user appointments error");
  }
});

app.get("/api/doctor/appointments/:doctorId", async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT 
        a.id,
        a.user_id,
        a.doctor_id,
        a.appointment_time,
        a.status,
        u.username AS patient_name,
        u.email AS patient_email
       FROM appointments a
       JOIN users u ON a.user_id = u.id
       WHERE a.doctor_id = ?
       ORDER BY a.appointment_time ASC`,
      [req.params.doctorId]
    );

    return res.json({ success: true, appointments: rows });
  } catch (err) {
    return sendServerError(res, err, "Get doctor appointments error");
  }
});

// ------------------------------------------------------------
//            UPDATE APPOINTMENT STATUS (ACCEPT/REJECT)
// ------------------------------------------------------------
app.put("/api/appointments/status", async (req, res) => {
  try {
    const { appointment_id, status } = req.body;

    const [result] = await db
      .promise()
      .query("UPDATE appointments SET status=? WHERE id=?", [
        status,
        appointment_id,
      ]);

    if (result.affectedRows === 0)
      return res.json({ success: false, message: "Appointment not found" });

    return res.json({ success: true, message: `Appointment ${status}` });
  } catch (err) {
    return sendServerError(res, err, "Update status error");
  }
});

// ------------------------------------------------------------
//            DELETE APPOINTMENT
// ------------------------------------------------------------
app.delete("/api/appointments/:id", async (req, res) => {
  try {
    await db
      .promise()
      .query("DELETE FROM appointments WHERE id = ?", [req.params.id]);

    return res.json({ success: true });
  } catch (err) {
    return sendServerError(res, err, "Delete appointment error");
  }
});


// Haversine formula for distance
function distanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) *
      Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// ---------------------------------------------------------
// 1️⃣ SEARCH HOSPITALS BY CITY + QUERY
// ---------------------------------------------------------
app.post("/api/hospitals/search", (req, res) => {
  const { city, search } = req.body;

  let sql = "SELECT * FROM hospitals WHERE 1=1";
  let params = [];

  if (city) {
    sql += " AND city = ?";
    params.push(city);
  }

  if (search) {
    sql += " AND (name LIKE ? OR address LIKE ?)";
    params.push(`%${search}%`, `%${search}%`);
  }

  db.query(sql, params, (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    return res.json(rows);
  });
});

app.post("/api/hospitals/nearest", (req, res) => {
  const { latitude, longitude } = req.body;

  console.log("📍 Received NEAREST request:", latitude, longitude);

  if (!latitude || !longitude) {
    console.log("❌ Missing coordinates");
    return res.status(400).json({ msg: "Missing coordinates" });
  }

  const sql = "SELECT * FROM hospitals";

  db.query(sql, (err, rows) => {
    if (err) {
      console.log("❌ SQL error:", err);
      return res.status(500).json({ error: err });
    }

    console.log("📌 Found hospitals:", rows.length);

    try {
      const withDistance = rows.map((h) => {
        if (!h.lat || !h.lng) {
          console.log("⚠ Row missing lat/lng:", h);
        }

        return {
          ...h,
          distance_km: distanceKm(latitude, longitude, h.lat, h.lng),
        };
      });

      const sorted = withDistance.sort((a, b) => a.distance_km - b.distance_km);

      return res.json(sorted.slice(0, 10));
    } catch (ex) {
      console.log("🔥 Distance calculation error:", ex);
      return res.status(500).json({ error: "Distance calc failed" });
    }
  });
});

// -------------------- ADMIN LOGIN --------------------
app.post("/api/admin/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.promise().query(
      "SELECT * FROM admins WHERE email = ?", 
      [email]
    );

    if (rows.length === 0)
      return res.json({ success: false, message: "Admin not found" });

    const admin = rows[0];

    // PLAINTEXT PASSWORD CHECK (NO BCRYPT)
    const match = password === admin.password;

    if (!match)
      return res.json({ success: false, message: "Incorrect password" });

    return res.json({
      success: true,
      message: "Admin logged in",
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
      }
    });

  } catch (err) {
    console.error("ADMIN LOGIN ERROR:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});


// ------------------------------
//      ADMIN FETCH ROUTES
// ------------------------------
app.get("/api/admin/users", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM users");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.json({ success: false, message: "Error fetching users" });
  }
});

app.get("/api/admin/doctors", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM doctors");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.json({ success: false, message: "Error fetching doctors" });
  }
});

app.get("/api/admin/appointments", async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
      SELECT a.*, u.username AS user_name, d.name AS doctor_name
      FROM appointments a
      LEFT JOIN users u ON a.user_id = u.id
      LEFT JOIN doctors d ON a.doctor_id = d.id
    `);
    res.json({ success: true, data: rows });
  } catch (err) {
    res.json({ success: false, message: "Error fetching appointments" });
  }
});

app.get("/api/admin/hospitals", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM hospitals");
    res.json({ success: true, data: rows });
  } catch (err) {
    res.json({ success: false, message: "Error fetching hospitals" });
  }
});


// -------------------- START SERVER --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
