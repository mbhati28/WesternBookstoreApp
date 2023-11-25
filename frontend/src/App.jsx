import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import CartComponent from '../components/CartComponent.jsx';
import CartButton from '../components/CartButton.jsx';

function App() {

  return (
    <CartProvider>
      <CartComponent />
      <CartButton />
      {/* Rest of your app components */}
    </CartProvider>
  );

}


export default App;
