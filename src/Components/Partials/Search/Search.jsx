import React, { useState, useEffect } from "react";
import axios from "axios";


const Search = ({ items, setItems }) => {
  const [query, setQuery] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/search/${query}`);
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
  }, [query]);


  return (
    <div>
      <label>Search</label>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {items.map((value) => (
          <React.Fragment key={items.id}>
          <p>{value.title}</p>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}

export default Search;