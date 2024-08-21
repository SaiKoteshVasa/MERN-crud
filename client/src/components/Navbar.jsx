import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/" className="navbar__title">
        MERN APP
      </Link>
      <Link to="/" className="navbar__item">
        Add User
      </Link>
      <Link to="/all" className="navbar__item">
        View Users
      </Link>
    </div>
  );
};

export default Navbar;
