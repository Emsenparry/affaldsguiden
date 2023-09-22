import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewDetails from "../../Reviews/ReviewDetails/ReviewDetails";
import ReviewPost from "../../Reviews/ReviewPost/ReviewPost";
import { Layout } from "../../../Layout/Layout";
import { AiFillStar } from "react-icons/ai";
import styles from './StationerDetails.module.scss';
import { ContainerStyle } from "../../../Styled/Container.style";
import wave from '../../../../Assets/Images/Layout/bg-wave-1.svg';


const StationerDetails = () => {
   // Tilstand til at gemme stationens data
  const [data, setdata] = useState({});
  // Henter station_id fra URL'en
  const { station_id } = useParams();

  // useEffect bruges til at hente stationens data fra API'en ved komponentens indlæsning
  useEffect(() => {
    const getData = async () => {
      try {
         // Send en GET-anmodning til API'en for at få stationens data baseret på id
        const result = await axios.get(`http://localhost:4000/orgs/${station_id}`);
       // Opdater tilstanden data med de modtagne data fra anmodningen.
        setdata(result.data);
        
      } catch (err) {
        // Håndter eventuelle fejl ved at logge dem til konsollen
        console.error(err);
      }
    };
    getData();
  }, [station_id]);

  return (
    <>
    <ContainerStyle maxwidth="1100">
      <section className={styles.container}>
        {/* Tjekker om der er data, hvis ja forsætter koden, hvis nej bliver alt inden i () springt over */}
        {data && (
           // Layout-komponenten med stationens navn som titel
          <Layout title={data.name}>
          <div className={styles.wrapper} key={station_id}>
            <div>
              <iframe
                title="googlemaps"
                className={styles.googleMaps}
                src={`https://maps.google.com/maps?q=${data.longtitude},${data.latitude}&hl=es;&output=embed`}
              ></iframe>
            </div>
            <ContainerStyle maxwidth="1000">
            <div className={styles.info}>
              <h3>{data.name}</h3>
              <NumStars />
              <p>{data.address}</p>
              <p>
                {data.zipcode} {data.city}
              </p>
              <p>{data.country}</p>
            </div>
            {/* org_id vil blive tildelt data.id, hvis der er data i data. 
            Dette hjælper med at undgå fejl, hvis der ikke er nogen data at arbejde med. */}
            <ReviewPost org_id={data.id} />
            <ReviewDetails />
            </ContainerStyle>
          </div>
          </Layout>
        )}
      </section>
      </ContainerStyle>
      <img className={styles.wave} src={wave} alt="wave" />
    </>
  );
};

const NumStars = (props) => {
  // Opret en tilstand med et array af tomme strenge (5 elementer).
  const [numStars] = useState(new Array(5).fill(""));

  return (
    <div className={styles.stars}>
      {numStars &&
      // Brug map til at generere stjerneikoner baseret på antallet af stjerner 
        numStars.map((star, i) => {
          return (
            <div key={i}>
               {/* Hvis indekset er større end antallet af stjerner, vises en grå stjerne */}
              {i > props.num_stars - 1 ? (
                  <AiFillStar style={{ color: 'grey' }} />
              ) : (
                // Ellers vis en gul stjerne.
                <AiFillStar style={{ color: '#f3f309' }}  />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default StationerDetails;