🏥 Sanjeevani – Full-Stack Health Web Application
📌 Overview

Sanjeevani is a full-stack healthcare web application designed to bring together patients, doctors, blood banks, and pharmacies on one platform. The application provides essential healthcare services including:

🔍 Search for blood banks by location and blood group

🏨 Find nearby hospitals and doctors by specialty (e.g., cardiologist)

💊 Order medicines online with a cart and checkout system

👩‍⚕️ Role-based access for patients, doctors, and admins

The project uses a React frontend, Node.js/Express backend, and a MySQL database, ensuring scalability, security, and accessibility.

✨ Features

Authentication: Secure JWT-based login/signup with role-based access

Blood Bank Search: Find blood banks by blood group and location

Doctor & Hospital Lookup: Search by specialty and location using Google Maps API

Medicine Ordering: Search medicines, add to cart, place orders, view order history

Admin Panel: Manage users, blood banks, doctors, hospitals, and medicines

Responsive UI: Accessible on both desktop and mobile browsers

🛠 Tech Stack
Frontend

React.js

React Router

Backend

Node.js + Express.js

RESTful APIs

JWT for authentication

Database

 MySQL

Tools & APIs

Git + GitHub for version control

Postman for API testing

Google Maps API for hospital/doctor location services

Agile methodology with sprints

📂 Project Structure
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
├── database/            # SQL or MongoDB scripts
├── .env                 # Environment variables
├── README.md
└── package.json

🚀 Installation & Setup

Clone the repository

git clone https://github.com/your-username/sanjeevani.git
cd sanjeevani


Setup the backend

cd server
npm install
npm start


Setup the frontend

cd client
npm install
npm start


Environment Variables
Create a .env file in the server/ folder with:

📌 Future Enhancements

- Payment integration for medicine orders

- Appointment booking with doctors

- Emergency alert system

- Multi-language support
