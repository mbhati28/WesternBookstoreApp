import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "./Home.css"
import {Link} from 'react-router-dom';

const Home = () => {
  const { authData } = useContext(AuthContext);

  if (authData && authData.username) {
    return (
      <div className="home-container">
        <h1 className="home-title">Welcome, {authData.username}</h1>
        <p>Welcome back, avid reader! We're thrilled to have you here. With your login complete, you're now ready to dive into a world of literary wonders. Explore our extensive collection of books, curated just for you.
        Whether you're searching for a gripping thriller, an inspiring memoir, or a classic tale, you'll find it all here.
        But that's not all – you can also discover public booklists, created by fellow book enthusiasts, to spark your next reading adventure. Get ready to embark on a journey through the pages of countless stories. Happy reading!</p>
        <div className="home-button-row">
              <Link className="home-button" to="/books">
                          Browse Books
                        </Link>
              <Link className="home-button" to="/booklist">
                          Public Booklists
                        </Link>
            </div>
      </div>
    );
  } else {
    return (
      <div className="home-container">
        <h1 className="home-title">Welcome to Western BookStore!</h1>
        <div className="home-content">
          <p>We are your gateway to a world of literary exploration, offering an extensive collection of books spanning various genres. Whether you're a passionate reader or a casual book lover, our shelves hold something for everyone.
          If you're already a member of our book-loving community, simply click the "Login" button below to dive into our virtual aisles and explore your next literary adventure.
          If you're new here, we invite you to join us by clicking "Sign Up" and embark on a journey through the captivating realms of literature that await you. Happy reading!</p>
          {!authData && (
            <div className="home-button-row">
              <Link className="home-button" to="/login">
                Login
              </Link>
              <Link className="home-button" to="/signup">
                Signup
              </Link>
            </div>
          )}
         </div>
      </div>
    );
  }
};

export default Home;
