import React, { useState, useEffect } from "react";
import axios from "axios";


const Search = () => {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/search/${query}`);
        console.log(response.data);
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

  const filteredItems = items;

  return (
    <div className="App">
      <label>Search</label>
      <input type="text" onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {filteredItems.map((value, index) => (
          <h1 key={index}>{value.name}</h1>
        ))}
      </ul>
    </div>
  );
}

export default Search;