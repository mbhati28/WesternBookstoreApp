import React, { createContext, useReducer, useContext,useState } from "react";

// const CartContext = createContext();
const CartContext = createContext();

// const ADD_TO_CART = "ADD_TO_CART";
// const REMOVE_FROM_CART = "REMOVE_FROM_CART";

export const CartProvider = ({ children }) => {

const [cartItems, setCartItems] = useState([]);
const [totalPrice, setTotalPrice] = useState(0);
const [totalQuantities, setTotalQuantities] = useState(0);

// function cartReducer(state, action) {
//   switch (action.type) {
//     case ADD_TO_CART:
//       return [...state, action.payload];
//     case REMOVE_FROM_CART:
//       return state.filter((item) => item.id !== action.payload.id);
//     default:
//       return state;
//   }
// }

const onAdd = (product) => {
  // Retrieve the existing cart + info from local storage
  const storedCartData = localStorage.getItem('cartData');
  let cartData = [];
  let updatePrice = 0
  let updateQuantity = 0

  
  if (storedCartData) {
      cartData = JSON.parse(storedCartData);
      updatePrice = parseFloat(localStorage.getItem('price'));
      updateQuantity = parseInt(localStorage.getItem('quantity'));
  }
  
  // Check if the product already exists in the cart
  const existingProduct = cartData.find((item) => item.id === product.id);
  
  if (existingProduct) {
      // If the product is already in the cart, update its quantity
      existingProduct.quantity += 1;
  } else {
      // If the product is not in the cart, add it with a quantity of 1
      product.quantity = 1;
      cartData.push(product);
  }
  
  // update the total price and quantity
  updatePrice += (product.price)
  updateQuantity += 1
  setTotalPrice(updatePrice)
  setTotalQuantities(updateQuantity)
  setCartItems(cartData);

  // Update the cart, price and quantity in local storage
  localStorage.setItem('cartData', JSON.stringify(cartData));
  localStorage.setItem('quantity', updateQuantity.toString());
  localStorage.setItem('price', updatePrice.toString());

  // toast.success(`${product.title} added to the cart.`);
  
};

const removeItemFromCart = (productId) => {
  // Find the index of the product with the given id in the cart
  const productIndex = cartItems.findIndex((item) => item.id === productId);

  if (productIndex !== -1) {
      // Remove the product from the cart
      const updatedCart = [...cartItems];
      const removedProduct = updatedCart.splice(productIndex, 1)[0];

      // Calculate the price reduction for the removed product
      const priceReduction = removedProduct.price * removedProduct.quantity;

      // Update the total price and quantities
      const updatedPrice = Math.max(totalPrice - priceReduction, 0).toFixed(2);
      const updatedQuantities = totalQuantities - removedProduct.quantity;

      setTotalPrice(updatedPrice);
      setTotalQuantities(updatedQuantities);
      setCartItems(updatedCart);

      // Update the cart, price, and quantities in local storage
      localStorage.setItem('cartData', JSON.stringify(updatedCart));
      localStorage.setItem('quantity', updatedQuantities.toString());
      localStorage.setItem('price', updatedPrice.toString());

  }
};



// export const CartProvider = ({ children }) => {
//   const [cart, dispatch] = useReducer(cartReducer, []);

//   const addToCart = (item) => {
//     dispatch({ type: ADD_TO_CART, payload: item });
//   };

//   const removeFromCart = (item) => {
//     dispatch({ type: REMOVE_FROM_CART, payload: item });
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
//       {children}
//     </CartContext.Provider>
//   );

return (
  <CartContext.Provider
      value={{
          cartItems,
          setCartItems,
          totalPrice,
          setTotalPrice,
          totalQuantities,
          setTotalQuantities,
          onAdd,
          removeItemFromCart,
      }}
  >
      {children}
  </CartContext.Provider>
);
};

export const useCart = () => useContext(CartContext);

// export default useCart;
