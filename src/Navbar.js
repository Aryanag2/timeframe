import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <div className="nav-wrapper">
        <Link to="/" className="brand-logo">Schedule Planner</Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;