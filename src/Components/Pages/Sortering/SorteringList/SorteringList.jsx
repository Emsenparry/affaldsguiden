import axios from "axios";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../Layout/Layout";
import styles from "./Sortering.module.scss";
import { ContainerStyle } from "../../../Styled/Container.style";
import { Link } from "react-router-dom";
import wave from "../../../../Assets/Images/Layout/bg-waves-1.svg";

const SorteringList = () => {
  const [sortering, setSortering] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/section`);
        setSortering(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [setSortering]);

  return (
    <Layout title="Sortering">
      <ContainerStyle maxwidth="1100">
        <section className={styles.gallery}>
          {sortering &&
            sortering.map((item) => {
              return (
                <Link to={`${item.id}`}>
                  <figure key={item.id}>
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
  );
};

export default SorteringList;
