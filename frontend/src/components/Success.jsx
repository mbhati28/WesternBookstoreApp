import React, { useEffect } from "react";
import axios from 'axios';
import './successstyle.css'
const API_BASE_URL = "http://localhost:5151/api";

const Success = () => {

  const handleOrderAndCartClear = async (userId, completeOrder) => {
    try {
      // Save the order to the database
      const orderResponse = await axios.post(`${API_BASE_URL}/order/successful`, completeOrder);
      console.log('Order saved:', orderResponse.data);
  
      // Clear the user's cart after successful order saving
      const clearCartResponse = await axios.delete(`${API_BASE_URL}/user/cart/${userId}`);
      localStorage.removeItem("cartData");
      console.log('Cart cleared:', clearCartResponse.data);
  
    } catch (error) {
      console.error('Error in processing order and clearing cart:', error);
    }
  };

  const storedCartData = JSON.parse(localStorage.getItem('cartData'));
  const authData = JSON.parse(localStorage.getItem("authData"));
  
  

  if(storedCartData){
    const orderDetails = storedCartData.map(item => ({
      id: item.id,
      title: item.volumeInfo.title,
      quantity: item.quantity,
      price: item.saleInfo.listPrice.amount
    }));
  
    const totalAmount = orderDetails.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
    
    const completeOrder = {
      userId: authData._id,
      items: orderDetails,
      totalAmount: totalAmount
    };
    handleOrderAndCartClear(authData._id, completeOrder);
    return (
      <div className="order-success">
            <h1>Your order has been placed!</h1>
            <div className="order-details">
              <h2>Your Order Details:</h2>
              {completeOrder.items.map(item => (
                <div key={item.id} className="order-item">
                  <div>{item.title}</div>
                  <div>Quantity: {item.quantity}</div>
                  <div>Price: ${item.price.toFixed(2)}</div>
                </div>
              ))}
              <div className="order-total">Total Amount: ${completeOrder.totalAmount.toFixed(2)}</div>
            </div>
          </div>
    )
  }
  else{
    return (
      <div>your cart is empty</div>
    )
  }
}

export default Success