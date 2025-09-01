const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const mysql = require("mysql2");

const app = express();
app.use(bodyParser.json());
app.use(cors());

//msql connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "kumar2005",
  database: "sanjeevani" // Corrected: database names are case-sensitive
});

db.connect(err => {
  if (err) {
    console.error("MySQL connection error:", err);
    throw err;
  }
  console.log("MySQL connected");
});

// In-memory OTP store
let otpStore = {};

//Send OTP
app.post("/send-otp", async (req, res) => {
  const { phoneNumber, email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000);

  otpStore[email] = { otp, phoneNumber, expiresAt: Date.now() + 5 * 60 * 1000 };

  console.log("OTP generated and stored for", email, ":", otp);

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "kumarmanthri28@gmail.com",
        pass: "deapenqrepskfrxm" // Gmail App password
      }
    });

    await transporter.sendMail({
      from: "kumarmanthri28@gmail.com",
      to: email,
      subject: "Your Sanjeevani OTP Code",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h2 style="color: #4CAF50;">Sanjeevani - OTP Verification</h2>
          <p>Hello,</p>
          <p>Your One-Time Password (OTP) to complete your login is:</p>
          <h1 style="color: #333; letter-spacing: 5px;">${otp}</h1>
          <p>This OTP is valid for 5 minutes. Do not share it with anyone.</p>
          <hr style="border: none; border-top: 1px solid #ddd;">
          <p style="font-size: 12px; color: #888;">Thank you,<br>The Sanjeevani Team</p>
        </div>
      `
    });

    res.json({ success: true, message: "OTP sent successfully!" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ success: false, message: "Error sending OTP." });
  }
});

//  Verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  console.log("Verification request for:", email);
  console.log("Received OTP:", otp, "Type:", typeof otp);
  console.log("Stored OTP:", otpStore[email]?.otp, "Type:", typeof otpStore[email]?.otp);

  if (!otpStore[email]) {
    return res.status(400).json({ success: false, message: "OTP not found. Please request again." });
  }

  // Check expiry
  if (Date.now() > otpStore[email].expiresAt) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: "OTP expired!" });
  }

  // Compare
  if (String(otpStore[email].otp) === String(otp)) {
    const phoneNumber = otpStore[email].phoneNumber;

    const query =
      "INSERT INTO users (phone_number, email) VALUES (?, ?) ON DUPLICATE KEY UPDATE phone_number = VALUES(phone_number), email = VALUES(email)";

    db.query(query, [phoneNumber, email], (err) => {
      if (err) {
       console.error("DB error:", err.sqlMessage || err); // Added more detailed logging
        return res.status(500).json({ success: false, message: "Database error." });
      }
      delete otpStore[email];
      return res.json({ success: true, message: "OTP verified! Login successful." });
    });
  } else {
    return res.status(400).json({ success: false, message: "Incorrect OTP!" });
  }
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));