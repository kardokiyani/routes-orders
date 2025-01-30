const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const initDatabase = require("./config/initDB"); // Importing the  database initialization
const routesRouter = require("./routes/routes");
const ordersRouter = require("./routes/orders");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

initDatabase(); // Calling the function to set up the database

app.use("/routes", routesRouter);
app.use("/orders", ordersRouter);

app.get("/", (req, res) => {
  res.send("API is working!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
