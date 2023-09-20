import React from "react";
import LoginForm from "./LoginForm/LoginForm";
import logo from "../../../Assets/Images/Layout/Logo.svg";
import styles from "./Login.module.scss";
import { ContainerStyle } from "../../Styled/Container.style";

const Login = () => {
  return (
      <ContainerStyle maxwidth="1400">
        <section className={styles.container}>
          <div className={styles.logoBox}>
            <img src={logo} alt="logo" />
            <h2>Log ind på affaldsguiden for at anmelde stationer</h2>
          </div>
          <div>
            <LoginForm />
          </div>
        </section>
      </ContainerStyle>
  );
};

export default Login;
