import axios from "axios";
import React, { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom"; 
import { formatDate } from "../../../Helpers/Helpers"; 
import pfp from "../../../../Assets/Images/Layout/profilePicture.svg"; 
import styles from "./ReviewDetails.module.scss"; 

const ReviewDetails = () => {
  // Tilstand til at gemme detaljer om anmeldelser
  const [reviewDetails, setReviewDetails] = useState();
  // Henter 'station_id' fra URL-parametrene
  const { station_id } = useParams();

  // useEffect hook til at hente anmeldelsesdata fra API'en
  useEffect(() => {
    const getData = async () => {
      try {
        // Udfør en GET-anmodning til API'en baseret på 'station_id'
        const result = await axios.get(
          `http://localhost:4000/reviews/${station_id}`
        );
        // Gem resultatet (anmeldelsesdata) i tilstanden
        setReviewDetails(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    // Kald getData-funktionen, når 'station_id' ændres
    getData();
  }, [station_id]);

  return (
    <>
      {/* // Tjek om der er anmeldelsesdata tilgængelig */}
      {reviewDetails &&
        // Gennemgå og vis hver anmeldelse
        reviewDetails.map((item) => {
          return (
            <section className={styles.container} key={item.id}>
              <div className={styles.imgBox}>
                <img src={pfp} alt="profilepicture" />
              </div>
              <div className={styles.wrapper}>
                <h4>{item.subject}</h4>
                <p>{formatDate(item.created_at, true)}</p>
                <div>
                  <p>{item.comment}</p>
                  <p className={styles.name}>{item.user.firstname}</p>
                </div>
              </div>
            </section>
          );
        })}
    </>
  );
};

export default ReviewDetails;
