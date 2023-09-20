import axios from "axios";
import React, { useEffect, useState } from "react";
import { Layout } from "../../../Layout/Layout";
import styles from "./SorteringList.module.scss";
import { ContainerStyle } from "../../../Styled/Container.style";
import { Link } from "react-router-dom";
import wave from "../../../../Assets/Images/Layout/bg-waves-1.svg";
import {Search} from "../../../Partials/Search/Search";
import {AiOutlineSearch} from 'react-icons/ai'

const SorteringList = () => {
  const [sortering, setSortering] = useState([]);
  const [keyword, setKeyword] = useState("");

  function handleInput(e) {
    setKeyword(e.target.value);
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/section`);
        setSortering(result.data);
        console.log(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, []);


  return (
    <>
      <Layout title="Sortering">
        <ContainerStyle maxwidth="1100">
          {keyword && <Search keyword={keyword} />}
          <h1>Din guide</h1>
          <p>til en sund affaldssortering</p>
          <div className={styles.searchBar}>
            <div className={styles.searchBarIcon}>
              <input
                type="text"
                placeholder="Søg på affald"
                id="keyword" onKeyDown={handleInput}
              />
              <button className={styles.icon}>
                <AiOutlineSearch size={30} />
              </button>
            </div>
          </div>
        <section className={styles.gallery}>
          {sortering ? (
            sortering.map((item) => (
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
            ))
          ) : (
            <p>No results found.</p>
          )}
        </section>
      </ContainerStyle> {/* Luk <div> her */}
      <img className={styles.wave} src={wave} alt="wave" />
      </Layout>
    </>
  );
};

export default SorteringList;
