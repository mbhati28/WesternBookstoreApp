import React from 'react';
import axios from 'axios';

const PaymentComponent = ({ cartItems }) => {
 const handlePayment = async () => {
   try {
     console.log('Attempting to create checkout session with cart items:', cartItems);
     const response = await axios.post('http://localhost:5555/api/checkout', { cartItems },
   {headers:   {'Authorization': 'Bearer pk_test_51OFgAlBRD5NuqOJb1tzvfYDyeMIYdDnZsmIPdZcLqzKPGRXGTqxXxt5cJuJzqE3aiFiCvF5sFOXAPKwoSGKt8xsN00dnG4YCxv'}});
     console.log('Checkout session created:', response.data);
     window.location.href = response.data.url;
   } catch (error) {
     console.error('Error initiating checkout:', error);
     alert('Error initiating checkout. Please try again.');
   }
 };

  return (
    <div>
       <button onClick={handlePayment}>Proceed to Checkout</button>
    </div>
  );
};
export default PaymentComponent;
