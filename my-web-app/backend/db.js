const db = mysql.createPool({
  host: process.env.MYSQLHOST || "localhost",
  user: process.env.MYSQLUSER || "root",
  password: process.env.MYSQLPASSWORD,    // 🔴 no fallback
  database: process.env.MYSQLDATABASE,    // 🔴 no fallback
  port: process.env.MYSQLPORT ? Number(process.env.MYSQLPORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});
