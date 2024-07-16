import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="links">
        
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/addstudent">Addstudent</Link>
        <Link to="/getmystudents">GetMyStudents</Link>
        <Link to="/">Home</Link>
      </div>
    </nav>
  );
};

export default Navbar;
