import React from 'react';
import { useCart } from '/src/context/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

const CartButton = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleNavigateToCart = () => {
    navigate('/cart');
  };

  return (
    <button onClick={handleNavigateToCart}>
      Cart ({cartItems.length})
    </button>
  );
};

export default CartButton;
