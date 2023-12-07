import React, { useEffect, useContext } from "react";
import { useCart } from "../context/CartContext"; // Adjust the path based on your project structure
import "./CartPage.css";
import axios from "axios";
import {fetchCart, removeFromCart } from "../services/api";
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom';

const CartPage = () => {
  const {
    cartItems,
    setCartItems,
    removeItemFromCart,
  } = useCart();

  const {authData} = useContext(AuthContext);

  useEffect(() => {
    const storedCartData = localStorage.getItem("cartData");
    if (storedCartData) {
      setCartItems(JSON.parse(storedCartData));
    }
  }, []);

  useEffect(() => {
    // Define the function within useEffect
    const loadCartData = async () => {
      if (!authData || !authData._id) return; // Ensure authData and its _id are available
      const cartData = await fetchCart(authData._id);
      setCartItems(cartData);
    };

    loadCartData(); // Now calling the function without arguments
  }, [authData]);

  console.log(cartItems);

  const handleRemoveFromCart = (itemId) => {

    removeItemFromCart(itemId);
    console.log("I am inside", itemId);
    removeFromCart(authData._id, itemId);
  };

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

  if(cartItems){
    if (cartItems.length === 0) {
      return (
      <div className="empty-cart-message"><h1>Your cart is empty.</h1>
      <br></br><br></br>
      <Link className="browse-button" to="/books">
                    <h3>Browse Books</h3>
                  </Link>
                  </div>
      );
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
              <p>Price: {item.saleInfo.listPrice.amount}</p>
              <div>x{item.quantity}</div>
              <button onClick={() => handleRemoveFromCart(item.id)}>
                Remove from cart
              </button>
            </div>
          </div>
        ))}
        <button className="proceed-button" onClick={handlePayment}>Proceed to Checkout</button>
      </div>
    );
  }

else {
  return (<div className="empty-cart-message">Your cart is empty.</div>);

}


};

export default CartPage;
