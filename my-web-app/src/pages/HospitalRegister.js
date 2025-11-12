// src/pages/Hospitals.js
import React, { useState } from "react";

export default function Hospitals() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    bloodGroup: "",
    date: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `✅ Thank you, ${formData.name}!\n\nYou have successfully registered to donate ${formData.bloodGroup} blood on ${formData.date}.`
    );

    // reset form after submission
    setFormData({
      name: "",
      age: "",
      gender: "",
      bloodGroup: "",
      date: "",
    });
  };

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "60px auto",
        padding: "40px 24px",
        background: "#fff",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h1 style={{ color: "#b71c1c", textAlign: "center" }}>
         Register to Donate Blood
      </h1>
      <p
        style={{
          textAlign: "center",
          marginBottom: "30px",
          color: "#555",
          lineHeight: 1.6,
        }}
      >
        Thank you for your kindness! Please fill out the form below to schedule
        your blood donation. Our team will contact you soon.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "18px",
          fontSize: "1rem",
          color: "#333",
        }}
      >
        {/* Full Name */}
        <label>
          Full Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
            style={inputStyle}
          />
        </label>

        {/* Age */}
        <label>
          Age:
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
            style={inputStyle}
          />
        </label>

        {/* Gender */}
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>

        {/* Blood Group */}
        <label>
          Blood Group:
          <select
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleChange}
            required
            style={inputStyle}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </label>

        {/* Appointment Date */}
        <label>
          Preferred Donation Date:
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            background: "#b71c1c",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            padding: "12px 20px",
            fontSize: "1rem",
            fontWeight: 600,
            marginTop: "10px",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#a00000")}
          onMouseLeave={(e) => (e.target.style.background = "#b71c1c")}
        >
          Submit Registration
        </button>
      </form>
    </div>
  );
}

// Input styling
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "0.95rem",
};
