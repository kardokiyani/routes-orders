import React, { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch all orders from the backend
    axios
      .get("http://localhost:3000/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
      });
  }, []);

  return (
    <div>
      <h2>Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <h3>Order ID: {order.id}</h3>
            <p>Transport Firm: {order.transportFirm}</p>
            <p>Pickup Time: {order.pickupTime}</p>
            <p>Delivery Time: {order.deliveryTime}</p>
            <p>Package Count: {order.packageCount}</p>
            <h4>Sender:</h4>
            <p>{order.sender.name}</p>
            <p>
              {order.sender.address.street1}, {order.sender.address.city} -{" "}
              {order.sender.address.zip}
            </p>
            <h4>Receiver:</h4>
            <p>{order.receiver.name}</p>
            <p>
              {order.receiver.address.street}, {order.receiver.address.city} -{" "}
              {order.receiver.address.zip}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderList;
