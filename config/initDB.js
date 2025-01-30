const db = require("./db");

const initDatabase = () => {
  const createRoutesTable = `
    CREATE TABLE IF NOT EXISTS routes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    );
  `;

  const createOrdersTable = `
    CREATE TABLE IF NOT EXISTS orders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      route_id INT NOT NULL,
      transportFirm VARCHAR(255) NOT NULL,
      sender_name VARCHAR(255) NOT NULL,
      sender_street VARCHAR(255) NOT NULL,
      sender_city VARCHAR(255) NOT NULL,
      sender_zip VARCHAR(10) NOT NULL,
      receiver_name VARCHAR(255) NOT NULL,
      receiver_street VARCHAR(255) NOT NULL,
      receiver_city VARCHAR(255) NOT NULL,
      receiver_zip VARCHAR(10) NOT NULL,
      pickupTime DATETIME NOT NULL,
      deliveryTime DATETIME NOT NULL,
      packageCount INT NOT NULL,
      FOREIGN KEY (route_id) REFERENCES routes(id) ON DELETE CASCADE
    );
  `;

  db.query(createRoutesTable, (err) => {
    if (err) console.error("Error with creating routes table:", err);
    else console.log("Routes table is ready");
  });

  db.query(createOrdersTable, (err) => {
    if (err) console.error("Error with creating orders table:", err);
    else console.log("Orders table is ready");
  });
};

module.exports = initDatabase;
