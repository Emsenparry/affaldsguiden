import axios from "axios";
import { useEffect, useState, useMemo } from "react";

const Search = ({ keyword }) => {
  const [apiData, setApiData] = useState();

  useEffect(() => {
    // Fetch function
    const getData = async () => {
      const result = await axios.get(`http://localhost:4000/search/${keyword}`);
      setApiData(result.data.data);
    };
    getData();
  }, [keyword]);

  // Data filter function
  const data = useMemo(() => {
    if (!apiData) {
      return;
    }
    if (keyword) {
      // Filtrering ud fra søgeresultat
      return apiData.filter(
        (elm) =>
          elm.title.toLowerCase().includes(keyword.toLowerCase()) 
      );
    } else {
      // Random sortering og slice
      return apiData
        .sort(function (a, b) {
          return 0.5 - Math.random();
        })
        .slice(0, 10);
    }
  }, [apiData, keyword]);

  return (
    <div>
      {data && data.map((item, index) => {
        return (
          <div key={index} href={`/${item.id}`}>
            {item.title}
          </div>
        );
      })}
    </div>	
  );
};

export { Search };