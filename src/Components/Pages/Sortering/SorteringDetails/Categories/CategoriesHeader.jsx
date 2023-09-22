import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../../../Layout/Layout";
import { ContainerStyle } from "../../../../Styled/Container.style";
import styles from './CategoriesHeader.module.scss'

const CategoriesHeader = () => {
  // Tilstand til at gemme data om sektionen
  const [data, setData] = useState({});
  // Hent section_id fra URL'en ved hjælp af React Router useParams
  const { section_id } = useParams();

  // useEffect bruges til at hente data om sektionen, når komponenten indlæses eller section_id ændres
  useEffect(() => {
    const getData = async () => {
      try {
        // Send en GET-anmodning til API'en baseret på section_id for at få sektionsoplysninger
        const result = await axios.get(
          `http://localhost:4000/section/${section_id}`
        );
        // Gem dataene om sektionen i data-tilstanden
        setData(result.data);
      } catch (err) {
        // Håndter eventuelle fejl ved at logge dem til konsollen
        console.error(err);
      }
    };
    // Kald getData-funktionen ved komponentens indlæsning og når section_id ændres
    getData();
  }, [section_id]);


  return (
    <>
      <ContainerStyle maxwidth="1000">
          {/* Vis sektionens data, hvis data er tilgængelig */}
          {data ? (
            <Layout title={data.title}>
              <article className={styles.container}>
                <figure style={{ backgroundColor: `#${data.color}` }}>
                  <figcaption>s
                    <h3>{data.title}</h3>
                  </figcaption>
                  <img
                    src={
                      data && data.filename
                        ? `http://localhost:4000/Assets/Images/Guide/Categories/${data.filename}`
                        : ""
                    }
                    alt="logoimages"
                  />
                </figure>
              </article>
            </Layout>
          ) : null}
      </ContainerStyle>
    </>
  );
};

export default CategoriesHeader;
