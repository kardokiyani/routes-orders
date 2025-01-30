const express = require("express");
const db = require("../config/db");

const router = express.Router();

// Utility function to format dates to match MySQL's DATETIME format (YYYY-MM-DD HH:MM:SS)
const formatDate = (date) => {
  return new Date(date).toISOString().slice(0, 19).replace("T", " ");
};

// GETTING ORDERS
router.get("/", (req, res) => {
  db.query("SELECT * FROM orders", (err, results) => {
    if (err) {
      console.error("Error with fetching orders:", err);
      return res.status(500).json({ error: "Error with fetching orders" });
    }

    // Formating the results to handle JSON columns (sender, receiver)
    const formattedResults = results.map((order) => {
      let sender, receiver;

      // Check if sender and receiver are already parsed objects or JSON strings
      try {
        sender =
          typeof order.sender === "string"
            ? JSON.parse(order.sender)
            : order.sender;
        receiver =
          typeof order.receiver === "string"
            ? JSON.parse(order.receiver)
            : order.receiver;
      } catch (error) {
        console.error("Error with parsing sender or receiver:", error);
        return res
          .status(500)
          .json({ error: "Error with parsing sender or receiver" });
      }

      // Return the order details without the routeId in the response
      return {
        id: order.id,
        transportFirm: order.transportFirm,
        sender: {
          name: sender.name,
          address: {
            street1: sender.address.street1 || "No street provided",
            city: sender.address.city || "No city provided",
            zip: sender.address.zip || "No zip provided",
          },
        },
        receiver: {
          name: receiver.name,
          address: {
            street: receiver.address.street || "No street provided",
            city: receiver.address.city || "No city provided",
            zip: receiver.address.zip || "No zip provided",
          },
        },
        pickupTime: order.pickupTime,
        deliveryTime: order.deliveryTime,
        packageCount: order.packageCount,
      };
    });

    res.json(formattedResults);
  });
});

// Retrieve all orders sorted by pickupTime or another field
router.get("/sorted", (req, res) => {
  // Get sorting field from query params, defaulting to 'pickupTime'
  const sortBy = req.query.sortBy || "pickupTime";
  const sortDirection = req.query.sortDirection || "ASC"; // Default to ascending order

  // Validate the sort direction (ASC or DESC)
  if (!["ASC", "DESC"].includes(sortDirection)) {
    return res.status(400).json({ error: "Invalid sort direction" });
  }

  db.query(
    `SELECT * FROM orders ORDER BY ${sortBy} ${sortDirection}`,
    (err, results) => {
      if (err) {
        console.error("Error with fetching sorted orders:", err);
        return res
          .status(500)
          .json({ error: "Error with fetching sorted orders" });
      }

      // Formating the results to handle JSON columns (sender, receiver)
      const formattedResults = results.map((order) => {
        let sender, receiver;
        try {
          sender =
            typeof order.sender === "string"
              ? JSON.parse(order.sender)
              : order.sender;
          receiver =
            typeof order.receiver === "string"
              ? JSON.parse(order.receiver)
              : order.receiver;
        } catch (error) {
          console.error("Error with parsing sender or receiver:", error);
          return res
            .status(500)
            .json({ error: "Error with parsing sender or receiver" });
        }

        return {
          id: order.id,
          routeId: order.route_id,
          transportFirm: order.transportFirm,
          sender: {
            name: sender.name,
            address: {
              street1: sender.address.street1 || "No street provided",
              city: sender.address.city || "No city provided",
              zip: sender.address.zip || "No zip provided",
            },
          },
          receiver: {
            name: receiver.name,
            address: {
              street: receiver.address.street || "No street provided",
              city: receiver.address.city || "No city provided",
              zip: receiver.address.zip || "No zip provided",
            },
          },
          pickupTime: order.pickupTime,
          deliveryTime: order.deliveryTime,
          packageCount: order.packageCount,
        };
      });

      res.json(formattedResults);
    }
  );
});

// CREATING ORDERS
router.post("/", (req, res) => {
  const {
    transportFirm,
    sender,
    receiver,
    pickupTime,
    deliveryTime,
    packageCount,
  } = req.body;

  // Ensuring all required fields are provided
  if (!transportFirm || !sender || !receiver || !pickupTime || !packageCount) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Ensuring pickupTime and deliveryTime are formatted correctly
  const formattedPickupTime = formatDate(pickupTime);
  const formattedDeliveryTime = formatDate(deliveryTime);

  // Converting sender and receiver objects to JSON
  const senderJson = JSON.stringify(sender);
  const receiverJson = JSON.stringify(receiver);

  db.query(
    `INSERT INTO orders 
      (transportFirm, sender, receiver, pickupTime, deliveryTime, packageCount) 
      VALUES (?, ?, ?, ?, ?, ?);`,
    [
      transportFirm,
      senderJson,
      receiverJson,
      formattedPickupTime,
      formattedDeliveryTime,
      packageCount,
    ],
    (err, result) => {
      if (err) {
        console.error("Error with inserting order:", err);
        return res.status(500).json({ error: "Error with inserting order" });
      }
      res.json({ id: result.insertId, message: "Order added!" });
    }
  );
});

// UPDATING ORDERS
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { sender, receiver, packageCount, pickupTime, deliveryTime } = req.body;

  // Ensuring required fields are provided
  if (!sender || !receiver || !pickupTime || !deliveryTime) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Formating dates correctly
  const formattedPickupTime = formatDate(pickupTime);
  const formattedDeliveryTime = formatDate(deliveryTime);

  // Converting sender and receiver objects to JSON
  const senderJson = JSON.stringify(sender);
  const receiverJson = JSON.stringify(receiver);

  db.query(
    `UPDATE orders SET 
      sender = ?, receiver = ?, packageCount = ?, pickupTime = ?, deliveryTime = ? 
      WHERE id = ?`,
    [
      senderJson,
      receiverJson,
      packageCount,
      formattedPickupTime,
      formattedDeliveryTime,
      id,
    ],
    (err, result) => {
      if (err) {
        console.error("Error with updating order:", err);
        return res.status(500).json({ error: "Error with updating order" });
      }
      res.json({ message: "Order updated!" });
    }
  );
});

// DELETING ORDERS
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM orders WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error with deleting order:", err);
      return res.status(500).json({ error: "Error with deleting order" });
    }
    res.json({ message: "Order deleted!" });
  });
});

module.exports = router;
