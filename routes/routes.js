const express = require("express");
const db = require("../config/db");

const router = express.Router();

// GETTING ROUTES
router.get("/", (req, res) => {
  db.query("SELECT * FROM routes", (err, results) => {
    if (err) {
      console.error("Error with fetching routes:", err);
      return res.status(500).json({ error: "Error with fetching routes" });
    }
    res.json(results);
  });
});

// CREATING ROUTES
router.post("/", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });

  db.query("INSERT INTO routes (name) VALUES (?)", [name], (err, result) => {
    if (err) {
      console.error("Error with inserting route:", err);
      return res.status(500).json({ error: "Error with inserting route" });
    }
    res.json({ id: result.insertId, name });
  });
});

// UPDATING ROUTES
router.put("/:id", (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  db.query(
    "UPDATE routes SET name = ? WHERE id = ?",
    [name, id],
    (err, result) => {
      if (err) {
        console.error("Error with updating route:", err);
        return res.status(500).json({ error: "Error with updating route" });
      }
      res.json({ message: "Route updated!" });
    }
  );
});

// DELETING ROUTES
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM routes WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error with deleting route:", err);
      return res.status(500).json({ error: "Error with deleting route" });
    }
    res.json({ message: "Route deleted!" });
  });
});

module.exports = router;
