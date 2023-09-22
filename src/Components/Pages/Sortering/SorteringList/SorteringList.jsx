import axios from "axios";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../Layout/Layout";
import styles from "./SorteringList.module.scss";
import { ContainerStyle } from "../../../Styled/Container.style";
import { Link } from "react-router-dom";
import wave from "../../../../Assets/Images/Layout/bg-waves-1.svg";
import { Search } from "../../../Partials/Search/Search";
import { AiOutlineSearch } from "react-icons/ai";

const SorteringList = () => {
  // Tilstand til at gemme sektioner og søgeord
  const [sortering, setSortering] = useState([]);
  const [keyword, setKeyword] = useState("");

  // Funktion til at opdatere søgeordet ved input
  function handleInput(e) {
    setKeyword(e.target.value);
  }

  // useEffect bruges til at hente sektioner fra API'en, når komponenten indlæses
  useEffect(() => {
    const getData = async () => {
      try {
        // Send en GET-anmodning til API'en for at få alle sektioner
        const result = await axios.get(`http://localhost:4000/section`);
        // Gem sektionerne i tilstanden
        setSortering(result.data);
      } catch (err) {
        // Håndter eventuelle fejl ved at logge dem til konsollen
        console.error(err);
      }
    };
    // Kald getData-funktionen ved komponentens indlæsning (en gang)
    getData();
  }, []);

  return (
    <>
      {/* Layout-komponenten med titel */}
      <Layout title="Sortering">
        <ContainerStyle maxwidth="1100">
          {/* SEARCH BAR */}
          <div className={styles.container}>
            <h1>Din guide</h1>
            <p>til en sund affaldssortering</p>
            <div className={styles.searchBar}>
              <div className={styles.searchBarIcon}>
                <input
                  type="text"
                  placeholder="Søg på affald"
                  id="keyword"
                  onChange={handleInput}
                />
                <button className={styles.icon}>
                  <AiOutlineSearch size={30} />
                </button>
              </div>
            </div>
            {/* Vis søgeresultater kun hvis der er et søgeord */}
            {keyword && <Search keyword={keyword} />}
          </div>

          {/* GALLERY */}
          <section className={styles.gallery}>
            {sortering &&
              sortering.map((item) => {
                return (
                  // Link til sektionens detaljer baseret på id
                  <Link to={`${item.id}`} key={item.id}>
                    <figure>
                      <img
                        className={styles.trashImg}
                        src={`http://localhost:4000/Assets/Images/Guide/Categories/${item.filename}`}
                        alt="sectionimages"
                      />
                      <figcaption style={{ backgroundColor: `#${item.color}` }}>
                        <h3>{item.title}</h3>
                      </figcaption>
                    </figure>
                  </Link>
                );
              })}
          </section>
        </ContainerStyle>
        <img className={styles.wave} src={wave} alt="wave" />
      </Layout>
    </>
  );
};

export default SorteringList;
