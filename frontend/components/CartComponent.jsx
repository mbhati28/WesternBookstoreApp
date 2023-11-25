import React from 'react';
import { useCart } from '/src/context/CartContext.jsx';
import PaymentComponent from './PaymentComponent'

const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  return (
    <div>
      <h1>Shopping Cart</h1>
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <h3>{item.name} by {item.author}</h3>
              <p>Price: ${(item.price / 100).toFixed(2)}</p>
              <p>Quantity:
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
              </p>
              <button onClick={() => removeFromCart(item.id)}>Remove from Cart</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
      <button onClick={handlePayment}>Proceed to Checkout</button>
    </div>
  );
};

export default CartPage;
