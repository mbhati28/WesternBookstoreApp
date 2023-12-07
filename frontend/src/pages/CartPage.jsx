import React, { useEffect, useContext } from "react";
import { useCart } from "../context/CartContext";
import "./CartPage.css";
import axios from "axios";
import { fetchCart, removeFromCart } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, setCartItems, removeItemFromCart } = useCart();
  const { authData } = useContext(AuthContext);

  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      setCartItems(JSON.parse(storedCartData));
    }
  }, []);

  useEffect(() => {
    const loadCartData = async () => {
      if (authData && authData._id) {
        const cartData = await fetchCart(authData._id);
        setCartItems(cartData);
      }
    };
    loadCartData();
  }, [authData]);

  const handleRemoveFromCart = (itemId) => {
    removeItemFromCart(itemId);
    removeFromCart(authData._id, itemId);
  };

  const handlePayment = async () => {
    try {
      const response = await axios.post("http://localhost:5555/api/checkout", {
        cartItems,
      });
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error initiating checkout:", error);
    }
  };

  // Calculate subtotal
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.saleInfo.listPrice.amount * item.quantity;
    }, 0);
  };

  if (cartItems && cartItems.length > 0) {
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
              <p>Price: {item.saleInfo.listPrice.amount}</p>
              <div>x{item.quantity}</div>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove from cart
              </button>
            </div>
          </div>
        ))}
        <div className="subtotal">
          <h3>Subtotal: ${calculateSubtotal().toFixed(2)}</h3>
        </div>
        <button className="proceed-button" onClick={handlePayment}>
          Proceed to Checkout
        </button>
      </div>
    );
  } else {
    return (
      <div className="empty-cart-message">
        <h1>Your cart is empty.</h1>
        <br />
        <Link className="browse-button" to="/books">
          <h3>Browse Books</h3>
        </Link>
      </div>
    );
  }
};

export default CartPage;
