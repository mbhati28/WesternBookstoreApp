import React, { useContext } from 'react';
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { authData } = useContext(AuthContext);

  if(authData && authData.username){
    return <h1>Welcome, {authData.username}</h1>
  }

  else{
    return <h1>Home</h1>
  }

 
};

export default Home;
