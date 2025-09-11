🏥 Sanjeevani – Full-Stack Healthcare Web Platform
📖 Introduction

Sanjeevani is a modern full-stack healthcare web application that connects patients, doctors, pharmacies, and blood banks through a single, unified digital platform.

Designed with scalability, security, and user accessibility in mind, Sanjeevani streamlines essential healthcare services—making them available anytime, anywhere.

✨ Key Features

🔐 Authentication & OTP Verification
Secure login/signup with OTP-based verification, ensuring safe access for patients, doctors, and admins.

🩸 Blood Bank Locator
Search for blood banks based on location and blood group availability.

👨‍⚕️ Doctor & Hospital Search
Find doctors by specialty (e.g., cardiologists) and discover nearby hospitals using Google Maps API.

💊 Online Pharmacy
Browse medicines, add to cart, order seamlessly, and track purchase history.

📊 Admin Dashboard
Centralized management of users, hospitals, doctors, blood banks, and medicines.

📱 Responsive UI
Optimized for both desktop and mobile, ensuring accessibility for all users.

🛠️ Technology Stack

Frontend

React.js

React Router

Backend

Node.js + Express.js

RESTful APIs

OTP-based authentication (via Email/SMS)

Database

MySQL

APIs & Tools

Google Maps API (hospital & doctor search)

Postman (API testing)

Git & GitHub (version control)

Agile methodology with sprints

📂 Project Architecture
sanjeevani/
├── client/              # React frontend
│   ├── public/
│   ├── src/
│   └── package.json
├── server/              # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
├── database/            # SQL migration scripts
├── .env                 # Environment variables
├── README.md
└── package.json

🚀 Setup & Installation

Clone the repository

git clone https://github.com/your-username/sanjeevani.git
cd sanjeevani


Backend Setup

cd server
npm install
npm start


Frontend Setup

cd client
npm install
npm start


Environment Variables
Create a .env file in the server/ directory with:

Database credentials

OTP service credentials (e.g., Twilio, SendGrid, or custom SMTP)

API keys (Google Maps, etc.)

🔮 Future Roadmap

💳 Payment Gateway – Secure online payments for medicine orders.

📅 Appointment Scheduling – Book and manage doctor appointments.

⚡ Sanjeevani isn’t just a web app—it’s a step toward smarter, more accessible healthcare for everyone.
