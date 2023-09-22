import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from '../../../Assets/Images/Layout/Logo.svg'
import loginUnlocked from '../../../Assets/Images/Layout/login-unlocked.svg'
import './Navigation.scss'
import { ContainerStyle } from "../../Styled/Container.style";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="background">
    <ContainerStyle maxwidth="1400">
    <nav>
      <Link to="/" className="title">
        <img className="navLogo" src={logo} alt="logo"/>
      </Link>
      <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
      <li>
          <NavLink to="/">Forside</NavLink>
        </li>
        <li>
          <NavLink to="/sortering">Sortering</NavLink>
        </li>
        <li>
          <NavLink to="/stationer">Genbrugsstationer</NavLink>
        </li>
        <li>
          <NavLink to="/bestil">Bestil beholder</NavLink>
        </li>
      </ul>
      <Link to="/login" className="login-icon">
      <img src={loginUnlocked} alt="login-icon"/>
      </Link>
    </nav>
    </ContainerStyle>
    </div>
  );
};

export default Navigation;