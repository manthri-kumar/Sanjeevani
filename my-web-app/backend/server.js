// ==========================================================
// IMPORTS
// ==========================================================
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");

// ==========================================================
// APP INITIALIZATION
// ==========================================================
const app = express();
app.use(cors());
app.use(express.json());

// ==========================================================
// DATABASE CONNECTION (POOL)
// ==========================================================
const db = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD || "asdfghjk",
  database: process.env.MYSQLDATABASE || "sanjeevani",
  port: process.env.MYSQLPORT ? Number(process.env.MYSQLPORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ MySQL Pool connection error:", err.message || err);
  } else {
    console.log("✅ MySQL connected (Pool established)");
    if (connection?.release) connection.release();
  }
});

// ==========================================================
// CORS CONFIGURATION
// ==========================================================
app.use(
  cors({
    origin: ["http://localhost:3000", "https://sanjeevani.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

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
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const [existing] = await db.promise().query("SELECT id FROM users WHERE email = ?", [email]);
    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.promise().query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    return res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("❌ Signup Error:", err);
    return res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

// 🔵 LOGIN ROUTE
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ success: false, message: "Email and password are required" });

  try {
    const [results] = await db.promise().query("SELECT * FROM users WHERE email = ?", [email]);

    if (results.length === 0)
      return res.status(401).json({ success: false, message: "User not found" });

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(401).json({ success: false, message: "Incorrect password" });

    return res.json({
      success: true,
      message: "Login successful",
      user: { id: user.id, username: user.username, email: user.email },
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return res.status(500).json({ success: false, message: "Server error during login" });
  }
});

// ==========================================================
// BLOOD BANK ROUTES
// ==========================================================
// KEEP YOUR BLOOD BANK ROUTES HERE (unchanged)

// ...

// ==========================================================
// START SERVER
// ==========================================================
const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
