import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { login, fetchCart } from "../services/api";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "react-google-login";
import { useCart } from "../context/CartContext";
import "./authstyle.css"

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [error, setError] = useState("");
  const { setUserAuthInfo } = useContext(AuthContext);
  const { setCartItems } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await login(email, password);
      setUserAuthInfo(response.data);
      const id = response.data._id;
      const items = await fetchCart(id);
      if (items) {
        setCartItems(items);
      }

      navigate("/");
      console.log("Login successful:", response.data);
    } catch (err) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Login failed. Please try again.");
    }
  };

  // Handle response from Google login
  const responseGoogle = async (response) => {
    console.log("Google response object:", response); // Log the entire response object
    try {
      const token = response.tokenId;
      console.log("Google token received:", token); // Log the token

      const res = await googleLogin({ token: response.tokenId });
      console.log("Google login successful:", res.data);
      // Handle Google login success
    } catch (error) {
      console.error(
        "Google login error:",
        error.response?.data || error.message
      );
    }
  };



  return (
    <div className="auth-form-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          onChange={(e) => setPass(e.target.value)}
          required
          type="password"
          placeholder="****"
          id="password"
          name="password"
        />
        <button type="submit">Log In</button>
      </form>

      <div className="social-login">
        <GoogleLogin
          clientId="589361707877-g76lohmtelhsp97qpo37dfc81ho3u21c.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>

      <button className="link-btn" onClick={() => navigate("/signup")}>
        Don't have an account? Register here.
      </button>
    </div>
  );
};

export default Login;