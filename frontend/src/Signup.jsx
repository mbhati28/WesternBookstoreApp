import React, { useState } from "react";
import { registerUser } from "./apiService";

export const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      // Make an API call to register the user
      const response = await registerUser({
        username: name,
        email,
        password: pass,
      });
      console.log("User registered:", response.data);
      // Handle successful registration (e.g., redirect to login or display success message)
      // You might want to redirect the user to the login page or show a success message
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      // Handle errors (e.g., display error message to the user)
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(email);
  // };

  return (
    <div className="auth-form-container">
      <h2>Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full name</label>
        <input
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          id="name"
          placeholder="full Name"
        />
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="youremail@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">password</label>
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
      <button className="link-btn" onClick={() => props.onFormSwitch("login")}>
        Already have an account? Login here.
      </button>
    </div>
  );
};
