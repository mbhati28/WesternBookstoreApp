// src/pages/CartPage.js
import React from 'react';
import { useCart } from '../context/CartContext'; // Adjust the path based on your project structure
import './CartPage.css';
import PaymentComponent from "../components/paymentcomponent.jsx";

const CartPage = () => {
  const { cart, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img src={item.volumeInfo.imageLinks.thumbnail} alt={item.volumeInfo.title} className="cart-item-image" />
          <div className="cart-item-info">
            <h3>{item.volumeInfo.title}</h3>
            <p>Price: {item.saleInfo.retailPrice.amount} {item.saleInfo.retailPrice.currencyCode}</p>
            {/* Add more item details if needed */}
            <button onClick={() => removeFromCart(item)}>Remove from cart</button>
          </div>
        </div>
      ))}
      <button onClick={PaymentComponent}>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
