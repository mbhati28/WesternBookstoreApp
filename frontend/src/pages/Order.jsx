import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import "./orderstyle.css";

const Order = () => {
  const API_BASE_URL = "http://localhost:5151/api";
  const [orders, setOrders] = useState([]);
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      if (authData && authData._id) {
        try {
          const response = await axios.get(
            `${API_BASE_URL}/user/orders/${authData._id}`
          );
          const sortedOrders = response.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setOrders(sortedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      }
    };

    fetchOrders();
  }, [authData]);

  return (
    <div>
      <h2>Your Order History</h2>
      {orders.length === 0 ? (
        <p>No Order History Available</p>
      ) : (
        <div>
          {orders.map((order, index) => (
            <div key={index} className="order">
              <h3>Order ID: {order._id}</h3>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Total Amount: {order.totalAmount}</p>
              <div className="item-list">
                {order.items.map((item, idx) => (
                  <p key={idx} className="item">
                    {item.title} - Quantity: {item.quantity}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
