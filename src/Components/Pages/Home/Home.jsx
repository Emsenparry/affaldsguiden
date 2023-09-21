import React from "react";
import Header from "../../Partials/Header/Header";
import styles from "./Home.module.scss";
import { NavLink } from "react-router-dom";
import wave from "../../../Assets/Images/Layout/bg-wave-1.svg";
import { Layout } from "../../Layout/Layout";

const Home = () => {
  return (
    <Layout title="Forside">
      <Header />
      <section>
        <figure className={styles.figureMain}>
          <figcaption>
            <h1>
              <span>Din guide til sortering</span>
            </h1>
            <p>
              Her kan du se hvordan du skal sortere og hvad der skal i hvilke
              beholdere. Du får også tips og tricks til, hvordan du gør det nemt
              at sortere hjemme hos dig.
            </p>
            <div className={styles.buttons}>
              <button>
                <NavLink to="sortering">Se affaldsguide</NavLink>
              </button>
              <button>Bestil storskrald</button>
            </div>
          </figcaption>
          <img
            src={require("../../../Assets/Images/Photos/medium/trash.webp")}
            alt="trash"
          />
        </figure>
      </section>
      <section>
        <figure className={styles.figureMainTwo}>
          <img
            src={require("../../../Assets/Images/Photos/medium/trashcans.webp")}
            alt="trashcans"
          />
          <figcaption>
            <h1>
              <span>Din guide til sortering</span>
            </h1>
            <p>
              Her kan du se hvordan du skal sortere og hvad der skal i hvilke
              beholdere. Du får også tips og tricks til, hvordan du gør det nemt
              at sortere hjemme hos dig.
            </p>
            <div className={styles.buttons}>
              <button>
                <NavLink to="bestil">Bestil nu</NavLink>
              </button>
            </div>
          </figcaption>
        </figure>
      </section>
      <img className={styles.wave} src={wave} alt="wave" />
    </Layout>
  );
};

export default Home;
