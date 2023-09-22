import axios from "axios"; // Importerer Axios til at udføre HTTP-anmodninger
import React, { useEffect, useState } from "react"; // Importerer React, useEffect, og useState hooks
import { AiFillStar } from "react-icons/ai"; // Importerer stjernesymboler fra React Icons
import styles from './ReviewList.module.scss'; // Importerer stilarter til komponenten

// ReviewList-komponenten modtager 'org_id' som en prop og henter anmeldelsesdata baseret på det.
const ReviewList = (props) => {
  // Tilstand til at gemme anmeldelsesdata
  const [data, setData] = useState([]);
  // Henter 'org_id' fra props
  const { org_id } = props;

  // useEffect hook til at hente anmeldelsesdata fra API'en baseret på 'org_id'
  useEffect(() => {
    const getData = async () => {
      try {
        // Udfør en GET-anmodning til API'en baseret på 'org_id'
        const result = await axios.get(
          `http://localhost:4000/reviews/${org_id}`
        );
        // Gem resultatet (anmeldelsesdata) i tilstanden
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    // Kald getData-funktionen, når 'org_id' ændres
    getData();
  }, [org_id]);

  // Returnerer NumStarsog sender anmeldelsesdata som en prop
  return (
    <NumStars num_stars={data} />
  )
};

// NumStars-komponenten modtager anmeldelsesdata som en prop og viser stjernesymboler baseret på antallet af stjerner.
const NumStars = (props) => {
  // Opretter et array med 5 tomme elementer for at repræsentere de mulige stjerner
  const [numStars] = useState(new Array(5).fill(""));

  return (
    <div className={styles.stars}>
      {numStars &&
        numStars.map((star, i) => {
          return (
            <div key={i}>
              {i > props.num_stars - 1 ? (
                // Hvis indekset er større end antallet af stjerner, vises en grå stjerne
                  <AiFillStar style={{ color: 'grey' }} />
              ) : (
                // Ellers vises en gul stjerne
                <AiFillStar style={{ color: '#f3f309' }}  />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ReviewList;
