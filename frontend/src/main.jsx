import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import { BooklistProvider } from "./context/BookListContext";
<script src="https://apis.google.com/js/platform.js" async defer></script>


ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BooklistProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </BooklistProvider>
  </AuthProvider>,
  document.getElementById("root")
);
