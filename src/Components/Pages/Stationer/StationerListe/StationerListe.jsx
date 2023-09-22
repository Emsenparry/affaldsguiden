import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewList from "../../Reviews/ReviewList/ReviewList";
import { Layout } from "../../../Layout/Layout";
import { ContainerStyle } from "../../../Styled/Container.style";
import styles from "./StationerListe.module.scss";
import wave from "../../../../Assets/Images/Layout/bg-wave-1.svg";

const StationerListe = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/orgs?attributes=id,name,address,zipcode,city,longtitude, latitude`
        );
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [setData]);

  return (
    <>
      <Layout title="Genbrugsstationer">
        <ContainerStyle maxwidth="1100">
          <section className={styles.container}>
            {data &&
              data.map((station) => {
                return (
                  <article className={styles.wrapper} key={station.id}>
                      <div>
                        <iframe
                          title="googlemaps"
                          className={styles.googleMaps}
                          src={`https://maps.google.com/maps?q=${station.longtitude},${station.latitude}&hl=es;&output=embed`}
                        ></iframe>
                      </div>
                      <div className={styles.infoBox}>
                        <Link to={`/stationer/${station.id}`}>
                          <h3>{station.name}</h3>
                          <div className={styles.info}>
                            <p>{station.address}</p>
                            <p>
                              {station.zipcode} {station.city}
                            </p>
                          </div>
                        </Link>
                        <ReviewList org_id={station.id} />
                      </div>
                  </article>
                );
              })}
          </section>
        </ContainerStyle>
        <div>
          <img className={styles.wave} src={wave} alt="wave" />
        </div>
      </Layout>
    </>
  );
};

export default StationerListe;
