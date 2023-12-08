import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests
import { useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { GoogleLogin } from "react-google-login";
// import { googleLogin } from "../services/api";
import "./authstyle.css"
const Signup = (props) => {
  // State for the normal sign-up form
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle normal sign-up form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      const response = await register(name, email, password);
      console.log("User registered:", response.data);
      setEmail("");
      setPass("");
      setName("");

      // Alert the user
      alert("You have successfully signed up! Please Login to Continue");

      // Redirect to the login page
      navigate("/login");
      // Handle successful registration, e.g., redirect or show a message
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
    }
  };

  // Handle response from Google login
  // const responseGoogle = async (response) => {
  //   try {
  //     const res = await googleLogin({ token: response.tokenId });
  //     console.log("Google login successful:", res.data);
  //     // Handle Google login success
  //   } catch (error) {
  //     console.error(
  //       "Google login error:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  return (
    <div className="auth-form-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Form fields for normal sign-up */}
        <label htmlFor="name">Full name</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="Full Name"
        />
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
          value={password}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <button type="submit">Sign Up</button>
      </form>

      {/* Google Login Button for sign-up with Google */}
      {/* <GoogleLogin
        clientId="589361707877-g76lohmtelhsp97qpo37dfc81ho3u21c.apps.googleusercontent.com"
        buttonText="Sign Up with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      /> */}

      <button className="link-btn" onClick={() => navigate("/login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};

export default Signup;
