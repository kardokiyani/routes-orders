import React, { useState } from "react";
import OrderList from "./components/OrderList";
import OrderForm from "./components/OrderForm";

function App() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = () => {
    // Fetch all orders from the backend
    fetch("http://localhost:3000/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));
  };

  return (
    <div className="App">
      <OrderForm fetchOrders={fetchOrders} />
      <OrderList orders={orders} />
    </div>
  );
}

export default App;
