import axios from "axios";
import { useEffect, useState, useMemo } from "react";

// Definition af komponenten Search, der modtager et argument 'keyword'
const Search = ({ keyword }) => {
  // Opret en tilstand til at gemme data fra API'en
  const [apiData, setApiData] = useState();

  // Hent data fra API'en, når 'keyword' ændres
  useEffect(() => {
    // Funktionen til at hente data
    const getData = async () => {
      // Udfør en GET-anmodning til API'en baseret på det givne søgeord
      const result = await axios.get(`http://localhost:4000/search/${keyword}`);
      // Vi bruger result.data.data på grund af API-strukturen, hvor den ydre "data" refererer
      // til API-svaret, og den indre "data" er selve dataene, vi ønsker at bruge i vores komponent.
      setApiData(result.data.data);
    };
    // Kald funktionen
    getData();
  }, [keyword]);

  // useMemo-hook: Filtrer data baseret på søgeordet og gem det i 'data' variablen
  const data = useMemo(() => {
    // Hvis der ikke er 'apiData', returner intet (null)
    if (!apiData) {
      return;
    }
    // Hvis der er et søgeord ('keyword'), filtrer dataen
    if (keyword) {
      // Filtrer dataen baseret på titlen og søgeordet (uanset store og små bogstaver)
      return apiData.filter(
        (elm) =>
          elm.title.toLowerCase().includes(keyword.toLowerCase()) 
      );
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