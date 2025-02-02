import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const OrderForm = ({ fetchOrders }) => {
  const [transportFirm, setTransportFirm] = useState("");
  const [sender, setSender] = useState({
    name: "",
    address: { street1: "", city: "", zip: "" },
  });
  const [receiver, setReceiver] = useState({
    name: "",
    address: { street: "", city: "", zip: "" },
  });
  const [pickupTime, setPickupTime] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [packageCount, setPackageCount] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      transportFirm,
      sender,
      receiver,
      pickupTime,
      deliveryTime,
      packageCount,
    };

    // Make a POST request to add the order
    axios
      .post("http://localhost:3000/orders", newOrder)
      .then((response) => {
        fetchOrders();
        alert("Order added successfully!");
      })
      .catch((error) => {
        console.error("Error with adding order:", error);
        alert("Failed to add order.");
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Order</h2>
      <input
        type="text"
        placeholder="Transport Firm"
        value={transportFirm}
        onChange={(e) => setTransportFirm(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Sender Name"
        value={sender.name}
        onChange={(e) => setSender({ ...sender, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Sender Street"
        value={sender.address.street1}
        onChange={(e) =>
          setSender({
            ...sender,
            address: { ...sender.address, street1: e.target.value },
          })
        }
        required
      />
      <input
        type="text"
        placeholder="Sender City"
        value={sender.address.city}
        onChange={(e) =>
          setSender({
            ...sender,
            address: { ...sender.address, city: e.target.value },
          })
        }
        required
      />
      <input
        type="text"
        placeholder="Sender Zip"
        value={sender.address.zip}
        onChange={(e) =>
          setSender({
            ...sender,
            address: { ...sender.address, zip: e.target.value },
          })
        }
        required
      />
      <input
        type="text"
        placeholder="Receiver Name"
        value={receiver.name}
        onChange={(e) => setReceiver({ ...receiver, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Receiver Street"
        value={receiver.address.street}
        onChange={(e) =>
          setReceiver({
            ...receiver,
            address: { ...receiver.address, street: e.target.value },
          })
        }
        required
      />
      <input
        type="text"
        placeholder="Receiver City"
        value={receiver.address.city}
        onChange={(e) =>
          setReceiver({
            ...receiver,
            address: { ...receiver.address, city: e.target.value },
          })
        }
        required
      />
      <input
        type="text"
        placeholder="Receiver Zip"
        value={receiver.address.zip}
        onChange={(e) =>
          setReceiver({
            ...receiver,
            address: { ...receiver.address, zip: e.target.value },
          })
        }
        required
      />
      <input
        type="datetime-local"
        value={pickupTime}
        onChange={(e) => setPickupTime(e.target.value)}
        required
      />
      <input
        type="datetime-local"
        value={deliveryTime}
        onChange={(e) => setDeliveryTime(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Package Count"
        value={packageCount}
        onChange={(e) => setPackageCount(e.target.value)}
        required
      />
      <button type="submit">Add Order</button>
    </form>
  );
};

export default OrderForm;
