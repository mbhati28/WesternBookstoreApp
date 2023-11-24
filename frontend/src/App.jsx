import React from 'react';
import PaymentComponent from '../components/paymentcomponent'; // Adjust the import path if necessary

function App() {
  // Mock cart items - replace this with your actual cart items
  const cartItems = [
    {
      title: "Sample Book 1",
      price: 2000, // price in cents
      quantity: 1
    },
    {
      title: "Sample Book 2",
      price: 3000,
      quantity: 2
    },
    // ...more items
  ];

  return (
    <div className="App">
      <h1>Online Bookstore</h1>
      <PaymentComponent cartItems={cartItems} />
    </div>
  );
}

export default App;
