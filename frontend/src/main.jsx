import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  
    <AuthProvider>
    <CartProvider>
      <App />
    </CartProvider>
    </AuthProvider>,
  document.getElementById("root")
);
