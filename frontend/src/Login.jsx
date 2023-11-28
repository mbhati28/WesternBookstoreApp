import React, { useState } from "react";
import axios from "axios"; // Ensure axios is imported for HTTP requests
import { loginUser } from "./apiservice";
import { GoogleLogin } from "react-google-login";

export const Login = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  // Handle submission of the normal login form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password: pass });
      console.log("Login successful:", response.data);
      // Handle login success (e.g., store token, redirect user)
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      // Handle login errors (e.g., show error message)
    }
  };

  // Handle response from Google login
  const responseGoogle = async (response) => {
    console.log("Google response object:", response); // Log the entire response object
    try {
      const token = response.tokenId; // Assuming the token is in the 'tokenId' field
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
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
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

      <button
        className="link-btn"
        onClick={() => props.onFormSwitch("register")}
      >
        Don't have an account? Register here.
      </button>
    </div>
  );
};
