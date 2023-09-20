import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Search.module.scss";
import {AiOutlineSearch} from 'react-icons/ai'

const Search = ({ items, setItems }) => {
  const [query, setQuery] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/search/${query}`
        );
        setItems(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (query) {
      fetchData();
    } else {
      setItems([]);
    }
  }, [query, setItems]);

  return (
    <div className={styles.container}>
      <h1>Din guide</h1>
      <p>til en sund affaldssortering</p>
      <div className={styles.searchBar}>
        <div className={styles.searchBarIcon}>
          <input
            type="text"
            placeholder="Søg på affald"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className={styles.icon}>
            <AiOutlineSearch size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
