import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../../Assets/Images/Layout/Logo.svg'
import loginUnlocked from '../../../Assets/Images/Layout/login-unlocked.svg'
import './Navigation.scss'

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <Link to="/" className="title">
        <img src={logo} alt="logo"/>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      <li>
          <NavLink to="/forside">Forside</NavLink>
        </li>
        <li>
          <NavLink to="/sortering">Sortering</NavLink>
        </li>
        <li>
          <NavLink to="/genbrugsstationer">Genbrugsstationer</NavLink>
        </li>
        <li>
          <NavLink to="/bestil">Bestil beholder</NavLink>
        </li>
      </ul>
      <Link to="login" className="login-icon">
      <img src={loginUnlocked} alt="login-icon"/>
      </Link>
    </nav>
  );
};

export default Navigation;