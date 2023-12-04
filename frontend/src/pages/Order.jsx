import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Order = () => {

  const API_BASE_URL = "http://localhost:5151/api";
  const [orders, setOrders] = useState([]);
  const { authData } = useContext(AuthContext); // Assuming you have user authentication data in AuthContext

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with the correct URL to your backend endpoint
        const response = await axios.get(`${API_BASE_URL}/user/orders/${authData._id}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        // Handle error (e.g., show error message)
      }
    };

    if (authData && authData._id) {
      fetchOrders();
    }
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
              <div>
                {order.items.map((item, idx) => (
                  <p key={idx}>{item.title} - Quantity: {item.quantity}</p>
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
