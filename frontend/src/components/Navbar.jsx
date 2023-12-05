import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import AdminButton from "./AdminButton";
const Navbar = () => {
  const { authData, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Western BookStore
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav allitems">
          <Link className="nav-item nav-link" to="/books">
            Browse Books
          </Link>
          <Link className="nav-item nav-link" to="/cart">
            Cart
          </Link>
          <Link className="nav-item nav-link" to="/order">
            Order
          </Link>
          <Link className="nav-item nav-link" to="/booklist">
            Public Booklists
          </Link>
          {!authData && (
            <>
              <Link className="nav-item nav-link" to="/login">
                Login
              </Link>
              <Link className="nav-item nav-link" to="/signup">
                Sign Up
              </Link>
            </>
          )}
          {authData && (
            <>
              <Link className="nav-item nav-link" to="/createbooklist">
                Create BookList
              </Link>
              <Link className="nav-item nav-link" to="/mybooklist">
                My Booklists
              </Link>
              <Link
                className="nav-item nav-link"
                onClick={handleLogout}
              >
                Logout
              </Link>{" "}
            </>
          )}
          <AdminButton></AdminButton>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
