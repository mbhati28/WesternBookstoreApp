import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Home.css"

const Home = () => {
  const { authData } = useContext(AuthContext);

  if (authData && authData.username) {
    return (
      <div className="home-container">
        <h1>Welcome, {authData.username}</h1>
        
      </div>
    );
  } else {
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
};

export default Home;
