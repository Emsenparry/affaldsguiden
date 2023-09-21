import React from "react";
import HeroSlider from "../Hero/Carousel/Carousel";
import styles from "./Header.module.scss";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className={styles.heroHeader}>
        <HeroSlider />
      </div>
      {/* Find og anmeld genbrugsstationer  */}
        <div className={styles.container}>
          <h2>Find og anmeld genbrugsstationer</h2>
          <div className={styles.buttons}>
           <button><NavLink to="stationer">Find station</NavLink></button>
           <button><NavLink to="login">Login</NavLink></button>
          </div>
        </div>
    </header>
  );
};

export default Header;
