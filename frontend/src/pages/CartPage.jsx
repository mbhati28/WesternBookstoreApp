// src/pages/CartPage.js
import React, { useEffect } from "react";
import { useCart } from "../context/CartContext"; // Adjust the path based on your project structure
import "./CartPage.css";
import axios from "axios";
import PaymentComponent from "../components/paymentcomponent.jsx";

const CartPage = () => {
  
  const {cartItems, setCartItems, totalPrice, totalQuantities, setTotalPrice, setTotalQuantities, removeItemFromCart } = useCart();
    /* eslint-disable */
    useEffect(() => {
        const storedCartData = localStorage.getItem('cartData');
        const storedPrice = localStorage.getItem('price');
        const storedQuantity = localStorage.getItem('quantity');

        if (storedCartData) {
            setCartItems(JSON.parse(storedCartData));
        }
        if (storedPrice) {
            setTotalPrice(parseFloat(storedPrice));
        }
        if (storedQuantity) {
            setTotalQuantities(parseInt(storedQuantity));
        }
    }, [])

  console.log(cartItems);

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5555/api/checkout", {
        cartItems,
      });

      // Redirect the user to the Stripe Checkout page
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.map((item, index) => (
        <div key={index} className="cart-item">
          <img
            src={item.volumeInfo.imageLinks.thumbnail}
            alt={item.volumeInfo.title}
            className="cart-item-image"
          />
          <div className="cart-item-info">
            <h3>{item.volumeInfo.title}</h3>
            <p>
              Price: {item.saleInfo.listPrice.amount}
            </p>
            <div>x{item.quantity}</div>
            {/* Add more item details if needed */}
            <button onClick={() => removeItemFromCart(item.id)}>
              Remove from cart
            </button>
          </div>
        </div>
      ))}
      <button onClick={(handlePayment)}>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
