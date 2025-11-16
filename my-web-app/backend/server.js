// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());

/**
 * CORS - allow your frontend origin(s)
 * update origins array if your frontend runs from other host
 */
app.use(
  cors({
    origin: ["http://localhost:3000", "https://sanjeevani.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// ---------- MySQL Pool ----------
const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "kumar2005",
  database: process.env.DB_NAME || "sanjeevani",
  waitForConnections: true,
  connectionLimit: 10,
});

// quick connection check
db.getConnection((err, conn) => {
  if (err) {
    console.error("MySQL Connection Error:", err);
  } else {
    console.log("MySQL connected");
    conn.release();
  }
});

// ---------- Helpers ----------
const sendServerError = (res, err, msg = "Server error") => {
  console.error(msg, err);
  return res.status(500).json({ success: false, message: msg });
};

// ---------- Routes ----------

// Root
app.get("/", (req, res) => {
  res.send("Backend Running Successfully!");
});

// -------------------- USER SIGNUP --------------------
app.post("/api/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    // check exists
    const [exists] = await db.promise().query("SELECT id FROM users WHERE email = ?", [email]);
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
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const [rows] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "User not found" });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ success: false, message: "Incorrect password" });

    // return user object with 'username' (as requested)
    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    return sendServerError(res, err, "Login error");
  }
});

// -------------------- DOCTOR SIGNUP --------------------
app.post("/api/doctor/signup", async (req, res) => {
  try {
    const { name, email, specialist, experience, password } = req.body;

    if (!name || !email || !specialist || experience == null || !password)
      return res.status(400).json({ success: false, message: "All fields required" });

    const [exists] = await db.promise().query("SELECT id FROM doctors WHERE email = ?", [email]);
    if (exists.length > 0)
      return res.json({ success: false, message: "Doctor already exists" });

    const hashed = await bcrypt.hash(password, 10);

    await db
      .promise()
      .query(
        "INSERT INTO doctors (name, email, specialist, experience_years, password) VALUES (?, ?, ?, ?, ?)",
        [name, email, specialist, experience, hashed]
      );

    return res.json({ success: true, message: "Doctor registered successfully!" });
  } catch (err) {
    return sendServerError(res, err, "Doctor signup error");
  }
});

// -------------------- DOCTOR LOGIN --------------------
app.post("/api/doctor/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const [rows] = await db.promise().query("SELECT * FROM doctors WHERE email = ?", [email]);

    if (rows.length === 0)
      return res.status(404).json({ success: false, message: "Doctor not found" });

    const doctor = rows[0];
    const match = await bcrypt.compare(password, doctor.password);

    if (!match) return res.status(401).json({ success: false, message: "Incorrect password" });

    // IMPORTANT: return 'experience' (mapped) so frontend expecting `experience` works
    return res.json({
      success: true,
      doctor: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        specialist: doctor.specialist,
        experience: doctor.experience_years, // mapped field name
      },
    });
  } catch (err) {
    return sendServerError(res, err, "Doctor login error");
  }
});

// -------------------- SAVE DOCTOR AVAILABILITY --------------------
app.post("/api/doctor/availability", async (req, res) => {
  try {
    const { doctor_id, available_date, start_time, end_time } = req.body;

    if (!doctor_id || !available_date || !start_time || !end_time)
      return res.status(400).json({ success: false, message: "Missing fields" });

    // check existing record for that doctor + date (optional)
    const [exists] = await db
      .promise()
      .query("SELECT id FROM doctor_availability WHERE doctor_id = ? AND available_date = ?", [
        doctor_id,
        available_date,
      ]);

    if (exists.length > 0) {
      await db
        .promise()
        .query(
          "UPDATE doctor_availability SET start_time = ?, end_time = ? WHERE doctor_id = ? AND available_date = ?",
          [start_time, end_time, doctor_id, available_date]
        );
    } else {
      await db
        .promise()
        .query(
          "INSERT INTO doctor_availability (doctor_id, available_date, start_time, end_time) VALUES (?, ?, ?, ?)",
          [doctor_id, available_date, start_time, end_time]
        );
    }

    return res.json({ success: true, message: "Availability saved!" });
  } catch (err) {
    return sendServerError(res, err, "Save availability error");
  }
});

// -------------------- GET AVAILABILITY FOR A DOCTOR --------------------
app.get("/api/doctor/availability/:doctorId", async (req, res) => {
  try {
    const doctorId = req.params.doctorId;
    const [rows] = await db
      .promise()
      .query(
        "SELECT available_date, start_time, end_time FROM doctor_availability WHERE doctor_id = ? ORDER BY available_date",
        [doctorId]
      );

    return res.json({ success: true, availability: rows });
  } catch (err) {
    return sendServerError(res, err, "Get availability error");
  }
});

// -------------------- GET ALL DOCTORS (+ availability if present) --------------------
app.get("/api/doctors", async (req, res) => {
  try {
    // left join to get availability if exists
    const [rows] = await db.promise().query(`
      SELECT d.id, d.name, d.specialist, d.experience_years,
             a.available_date, a.start_time, a.end_time
      FROM doctors d
      LEFT JOIN doctor_availability a
        ON d.id = a.doctor_id
      ORDER BY d.name, a.available_date DESC
    `);

    // Map the result to group availability per doctor if there are multiple availability rows
    const doctorsMap = new Map();

    rows.forEach((r) => {
      if (!doctorsMap.has(r.id)) {
        doctorsMap.set(r.id, {
          id: r.id,
          name: r.name,
          specialist: r.specialist,
          experience: r.experience_years, // mapped
          availability: [],
        });
      }
      if (r.available_date) {
        doctorsMap.get(r.id).availability.push({
          available_date: r.available_date,
          start_time: r.start_time,
          end_time: r.end_time,
        });
      }
    });

    const doctors = Array.from(doctorsMap.values());
    return res.json({ success: true, doctors });
  } catch (err) {
    return sendServerError(res, err, "Load doctors error");
  }
});

// -------------------- Optional: rehash plain-text doctor passwords (ADMIN ONLY) --------------------
/**
 * NOTE: If you previously inserted doctors with plain-text "pass" values,
 * you can run this endpoint once (or run the equivalent script locally)
 * to replace plain-text passwords with hashed versions.
 *
 * SECURITY: This endpoint is unprotected — remove or protect it after use.
 */
app.post("/api/doctors/rehash-plain-passwords", async (req, res) => {
  try {
    // find doctors where password does NOT look like a bcrypt hash (simple heuristic: starts with $2)
    const [rows] = await db.promise().query("SELECT id, password FROM doctors");
    const updates = [];

    for (const r of rows) {
      const pw = r.password || "";
      if (!pw.startsWith("$2")) {
        // plain text -> hash it
        const hashed = await bcrypt.hash(pw, 10);
        updates.push(db.promise().query("UPDATE doctors SET password = ? WHERE id = ?", [hashed, r.id]));
      }
    }

    if (updates.length > 0) await Promise.all(updates);
    return res.json({ success: true, message: `Rehashed ${updates.length} doctor password(s)` });
  } catch (err) {
    return sendServerError(res, err, "Rehash error");
  }
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
