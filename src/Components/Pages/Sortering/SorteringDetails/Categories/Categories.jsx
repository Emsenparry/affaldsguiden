import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ContainerStyle } from "../../../../Styled/Container.style";
import { Layout } from "../../../../Layout/Layout";
import styles from "./Categories.module.scss";
import CategoriesHeader from "./CategoriesHeader";
import wave from "../../../../../Assets/Images/Layout/bg-wave-1.svg";

const Categories = () => {
  // Tilstand til at gemme kategoridata fra API'en
  const [category, setCategory] = useState([]);
   // Hent section_id fra endpointet ved hjælp af React Router useParams
  const { section_id } = useParams();

  // useEffect bruges til at hente kategoridata, når komponenten indlæses eller section_id ændres
  useEffect(() => {
    const getData = async () => {
      try {
        // Send en GET-anmodning til API'en baseret på section_id og inkluder typer
        const result = await axios.get(
          `http://localhost:4000/categories/${section_id}?incl_types=true`
        );
        // Gem dataene i kategoritilstanden
        setCategory(result.data);
      } catch (err) {
        // Håndter eventuelle fejl ved at logge dem til konsollen
        console.error(err);
      }
    };
    // Kald getData-funktionen ved komponentens indlæsning og når section_id ændres
    getData();
  }, [section_id]);

  return (
    <div>
      <ContainerStyle maxwidth="1000">
        <section className={styles.wrapper}>
          <CategoriesHeader />
           {/* Generer komponenter for hver kategori i category-tilstanden */}
          {category &&
            category.map((item) => {
              return (
                <Layout title={item.title} key={item.id}>
                  <article className={styles.container}>
                    <figure>
                      <img
                        src={require(`../../../../../Assets/Images/Guide/Icons/${item.icon_filename}`)}
                        alt="categoryimage"
                      />
                      <figcaption>
                        <h3>{item.title}</h3>
                      </figcaption>
                    </figure>
                  </article>
                </Layout>
              );
            })}
        </section>
      </ContainerStyle>
      <img className={styles.wave} src={wave} alt="wave" />
    </div>
  );
};

export default Categories;
