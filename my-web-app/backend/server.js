const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// --- CORS Configuration ---
app.use(cors({
    origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

// --- Database Connection Pool ---
const db = mysql.createPool({ 
    host: "localhost",
    user: "root",
    password: "kumar2005",
    database: "sanjeevani",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.error("MySQL Pool connection error:", err.message);
    } else {
        console.log("MySQL connected (Pool established)");
        connection.release(); 
    }
});

// ==========================================================
// BLOOD BANK ROUTES (Finalized)
// ==========================================================

// GET /api/states - Retrieves the list of all states
app.get("/api/states", (req, res) => {
    db.query("SELECT state_id, state_name FROM states ORDER BY state_name", (err, results) => {
        if(err) return res.status(500).json({success:false,message:"DB Error fetching states"});
        res.json(results);
    });
});

// GET /api/districts/:stateId - Retrieves districts based on selected state
app.get("/api/districts/:stateId", (req, res) => {
    const { stateId } = req.params;
    db.query("SELECT district_id, district_name FROM districts WHERE state_id=? ORDER BY district_name", [stateId], (err, results) => {
        if(err) return res.status(500).json({success:false,message:"DB Error fetching districts"});
        res.json(results);
    });
});

// POST /api/blood-banks/search - Executes the State/District search query
app.post("/api/blood-banks/search", (req,res)=>{
    const { districtId } = req.body;
    if(!districtId) return res.status(400).json({success:false,message:"District ID required"});
    
    // Query remains the same for State/District search
    const query = `
        SELECT BB.bank_id AS id, BB.bank_name AS name, BB.address, BB.category,
        BB.bank_type AS type, DATE_FORMAT(BB.last_updated,'%Y-%m-%d\\n%H:%i:%s') AS updated,
        (SELECT GROUP_CONCAT(blood_group, ':', units_available) FROM availability WHERE bank_id=BB.bank_id) AS availability
        FROM blood_banks BB WHERE BB.district_id=? ORDER BY BB.category DESC, BB.bank_name ASC
    `;
    
    db.query(query,[districtId],(err,results)=>{
        if(err) return res.status(500).json({success:false,message:"DB Error during search"});
        res.json(results);
    });
});

// NEW ROUTE: POST /api/blood-banks/nearest - Finds blood banks closest to the user's coordinates
app.post("/api/blood-banks/nearest", (req, res) => {
    const { latitude, longitude, radius = 50 } = req.body; 

    if (!latitude || !longitude) {
        return res.status(400).json({ success: false, message: "Latitude and longitude are required." });
    }

    // Haversine Formula for distance calculation in MySQL (6371 is Earth's radius in km)
    // NOTE: This assumes your blood_banks table has 'latitude' and 'longitude' columns.
    const query = `
        SELECT
            BB.bank_id AS id,
            BB.bank_name AS name,
            BB.address,
            BB.category,
            BB.bank_type AS type,
            DATE_FORMAT(BB.last_updated, '%Y-%m-%d\\n%H:%i:%s') AS updated,
            (6371 * acos(
                cos(radians(?)) * cos(radians(BB.latitude)) * cos(radians(BB.longitude) - radians(?)) + 
                sin(radians(?)) * sin(radians(BB.latitude))
            )) AS distance_km,
            (
                SELECT GROUP_CONCAT(blood_group, ':', units_available)
                FROM availability A
                WHERE A.bank_id = BB.bank_id
            ) AS availability
        FROM
            blood_banks BB
        HAVING
            distance_km < ?  
        ORDER BY
            distance_km ASC
        LIMIT 10;
    `;

    // Parameters for the query: [userLat, userLon, userLat, radius]
    const params = [latitude, longitude, latitude, radius];

    db.query(query, params, (err, results) => {
        if (err) {
            console.error("Error during nearest blood bank search:", err.sqlMessage || err);
            return res.status(500).json({ success: false, message: "Database error during radius search." });
        }
        
        // Add distance to the result set before sending
        res.json(results);
    });
});

app.listen(5000, () => console.log("✅ Server running on port 5000"));