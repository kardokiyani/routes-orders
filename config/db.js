const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.ADMIN_USERNAME,
  password: process.env.ADMIN_PASSWORD,
  database: process.env.DATABASE_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Error with connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("Connected to MySQL");
});

module.exports = db;
