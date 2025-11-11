Sanjeevani – Full-Stack Healthcare Web Application Setup Guide
Project Overview

Sanjeevani is a healthcare web platform developed using React (frontend) and Node.js with MySQL (backend).
It integrates patients, doctors, pharmacies, and blood banks into a single system — allowing users to search for doctors, order medicines, locate nearby blood banks, and manage healthcare needs digitally.

This guide provides step-by-step instructions to run the project locally for evaluation and demonstration.

Prerequisites

Before starting, ensure you have the following installed on your system:

Node.js (version 16 or above)

npm (comes with Node.js)

MySQL Server (version 8.0 or above)

Git

Visual Studio Code (or any code editor)

Browser (Google Chrome recommended)

Optional: The backend should be running at http://localhost:5000/
 for full functionality.

Folder Structure

Your Sanjeevani project structure should look like this:

my-web-app/
├── backend/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
├── public/                  # Public assets for React
│
├── src/
│   ├── assets/              # Images and static files
│   ├── components/
│   │   ├── Ambulance/
│   │   ├── AppointmentPage/
│   │   ├── BloodBank/
│   │   ├── Cart/
│   │   ├── Doctors/
│   │   ├── Healthmonitor/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Medicines/
│   │   └── Profile/
│   │
│   ├── App.css
│   ├── App.js
│   └── index.js
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

Step 1: Clone the Repository

Open a terminal and run the following commands:

git clone https://github.com/your-username/sanjeevani.git
cd my-web-app

Step 2: Database Setup

Open MySQL Workbench or command prompt.

Create a new database named sanjeevani:

CREATE DATABASE sanjeevani;


Import your SQL file (if provided):

mysql -u root -p sanjeevani < backend/database/sanjeevani.sql

Step 3: Configure Environment Variables

In the backend/ folder, create a .env file and add the following lines:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sanjeevani
PORT=5000

# Email/OTP Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Google Maps API
GOOGLE_MAPS_API_KEY=your_api_key


Explanation:

Database credentials are used by the backend to connect to MySQL.

Email configuration enables OTP-based login and verification.

Google Maps API is required for hospital and doctor search features.

Step 4: Backend Setup

Move to the backend directory and install dependencies:

cd backend
npm install
npm start


If successful, you’ll see:

Server is running on port 5000
Database connected successfully


Backend runs at http://localhost:5000/

Step 5: Frontend Setup

Navigate to the frontend root folder (my-web-app/) and install dependencies:

npm install
npm start


Once completed, the development server will start at:
http://localhost:3000

If both backend and frontend are running, the application should load successfully.

Step 6: Verify the Setup

After launching, verify that:

The Home Page loads successfully.

The Login/Signup page allows OTP-based authentication.

Medicines page supports “Add to Cart” and dynamic cart updates.

Blood Bank and Doctor Search display results using Google Maps API.

Admin Dashboard provides management for users, hospitals, and medicines.

Common Errors & Fixes
Issue	Cause	Fix
Database connection failed	MySQL not running or invalid credentials	Check .env file and restart MySQL
OTP not sending	Email service misconfigured	Verify email and password credentials
Frontend blank page	Backend not started	Start backend before frontend
Fetch failed	Wrong API URL	Ensure backend URL is correct (http://localhost:5000
)
Styles missing	Cache issue	Delete node_modules and run npm install again
Step 7: Optional – Build for Production

To create an optimized build for deployment:

npm run build
serve -s build


Then open http://localhost:3000
 to preview the production-ready version.

Prerequisites and Dependencies
Backend Dependencies

Installed via npm install inside backend/:

express

mysql2

cors

dotenv

nodemailer

body-parser

bcryptjs

jsonwebtoken

Frontend Dependencies

Installed via npm install inside the main folder:

react

react-dom

react-router-dom

axios

bootstrap or tailwindcss

Tools and APIs

Google Maps API for doctor and hospital search

Twilio or SMTP for OTP services

Postman for API testing

Project Summary

Sanjeevani is a full-stack healthcare web solution that simplifies access to medical services.
It enables users to:

Search for doctors and hospitals by location and specialty

Purchase medicines through a secure cart system

Locate nearby blood banks

Manage personal health information via their profiles

Provide admins with control over all entities (doctors, users, medicines, etc.)

Built with:

React.js for frontend

Node.js (Express) for backend

MySQL for data storage

In summary:
Once the faculty runs npm install → npm start for both backend and frontend and opens http://localhost:3000
, the Sanjeevani Healthcare System will be fully functional and ready for demonstration.
