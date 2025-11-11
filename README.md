Sanjeevani – Meta File
Project Overview

Sanjeevani is a full-stack healthcare web application developed using React.js, Node.js, and MySQL.
It connects patients, pharmacies, and blood banks through a unified online platform, providing access to essential healthcare services anytime, anywhere.

The system allows users to:

Register and log in securely using a login form (username and password).

Search for nearby ambulances using the Google Maps API.

Order medicines online and manage a shopping cart.

Locate nearby blood banks based on location and blood group.

This document provides the instructions to run the software and lists all prerequisites and dependencies required to execute the project successfully.

Prerequisites

Before running the project, ensure the following are installed on your system:

Software Requirements

Node.js (version 16 or above)

npm (comes with Node.js)

MySQL Server (version 8.0 or above)

Git

Visual Studio Code or any IDE

Browser (Google Chrome or Edge recommended)

Backend Dependencies

Installed via npm install inside the backend folder:

express – For building the web server and REST APIs

mysql2 – For connecting Node.js to MySQL

cors – For handling cross-origin requests

dotenv – For managing environment variables securely

body-parser – For handling JSON and form submissions

bcryptjs – For password encryption and verification

jsonwebtoken – For authentication tokens

Frontend Dependencies

Installed via npm install inside the main project folder:

react

react-dom

react-router-dom – For routing between pages

axios – For making API requests

bootstrap or tailwindcss – For responsive design and styling

External APIs and Tools

Google Maps API – Used for locating and displaying ambulance services on the map.

Postman – For API testing (optional).

Database

MySQL is used to store all users, medicines, ambulances, and blood bank details.

Import the provided SQL file (sanjeevani.sql) to create all necessary tables.

Folder Structure

Ensure your project follows this structure:

my-web-app/
├── backend/                 # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── config/
│   └── server.js
│
├── public/                  # React public assets
│
├── src/
│   ├── assets/              # Images and icons
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
│   ├── App.css
│   ├── App.js
│   └── index.js
│
├── package.json
├── package-lock.json
├── .gitignore
└── README.md

Instructions to Run the Software
Step 1: Clone the Repository
git clone https://github.com/your-username/sanjeevani.git
cd my-web-app

Step 2: Database Setup

Open MySQL Workbench or terminal.

Create a database named sanjeevani:

CREATE DATABASE sanjeevani;


Import your database schema:

mysql -u root -p sanjeevani < backend/database/sanjeevani.sql


Ensure tables like users, ambulances, medicines, and bloodbanks exist.

Step 3: Create Environment File

Create a .env file inside the backend folder and add the following lines:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=sanjeevani
PORT=5000

GOOGLE_MAPS_API_KEY=your_api_key
JWT_SECRET=your_jwt_secret


Explanation:

Database credentials allow the backend to connect to MySQL.

JWT_SECRET is used for authentication token generation.

GOOGLE_MAPS_API_KEY is required to display nearby ambulance locations on the map.

Step 4: Backend Setup

Navigate to the backend directory:

cd backend


Install all dependencies:

npm install


Start the backend server:

npm start


The backend will run at:

http://localhost:5000/

Step 5: Frontend Setup

Open a new terminal at the project root (my-web-app/).

Run:

npm install
npm start


The frontend React server will start at:

http://localhost:3000/

Step 6: Verify Application Functionality

Once both servers are running, open http://localhost:3000
 in your browser and verify:

Login and Registration:
Users can create an account and log in using email and password.
The backend verifies credentials and checks if the user exists in the database.

Home Page:
The homepage provides navigation to all major sections — Ambulance, Medicines, Blood Bank, Health Monitor, and Profile.

Ambulance Module:
Users can search for nearby ambulances using Google Maps API.
Ambulance locations and contact details appear on an interactive map.

Pharmacy (Medicines):
Users can browse medicines, add them to the cart, and place orders.

Blood Bank:
Users can search for nearby blood banks based on their location and required blood group.

Profile Page:
Users can view and update their personal information.

Step 7: Common Errors & Solutions
Issue	Cause	Solution
Backend not starting	Dependencies not installed	Run npm install inside backend folder
Database not connected	Incorrect credentials	Check .env file values
Login not working	Missing backend connection	Ensure backend is running on port 5000
Maps not loading	Invalid API key	Recheck Google Maps API key
Data not fetching	Wrong API routes	Verify Axios URLs in frontend code
Step 8: Optional – Build for Production

To create an optimized production build:

npm run build
serve -s build


Then visit:

http://localhost:3000

Execution Summary

To execute the project:

Start MySQL Server.

Run the backend:

cd backend
npm start


Run the frontend:

npm start


Open http://localhost:3000
 in your browser.

Workflow Summary

User registers through a signup form.

During login, the backend validates the entered credentials with the MySQL database.

Upon successful login, the user is redirected to the homepage.

Users can:

View and locate nearby ambulances using Google Maps API.

Order medicines online through the pharmacy page.

Search for nearby blood banks.

Manage profile details.

The admin monitors and manages all records related to system operations.

Conclusion

Sanjeevani is a comprehensive healthcare web system that enables users to search for ambulances, order medicines, and locate blood banks efficiently.
By following this setup guide, the project can be executed and demonstrated seamlessly on any local machine.
