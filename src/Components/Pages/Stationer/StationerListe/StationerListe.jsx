import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReviewList from "../../Reviews/ReviewList/ReviewList";
import { Layout } from "../../../Layout/Layout";
import {ContainerStyle} from '../../../Styled/Container.style';

const StationerListe = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/orgs?attributes=id,name,address,zipcode,city,longtitude, latitude`);
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
      <ContainerStyle maxwidth="1000">
        {data &&
          data.map((station) => {
            return (
              <div key={station.id}>
                <div>
                  <iframe
                    title="googlemapsimage"
                    className="googleMaps"
                    src={`https://maps.google.com/maps?q=${station.longtitude},${station.latitude}&hl=es;&output=embed`}
                  ></iframe>
                </div>
                <Link to={`/stationer/${station.id}`}>
                  <div>
                    <h3>{station.name}</h3>
                    <p>{station.address}</p>
                    <p>
                      {station.zipcode} {station.city}
                    </p>
                  </div>
                </Link>
                <ReviewList org_id={station.id} />
              </div>
            );
          })}
          
      </ContainerStyle>
      {/* WAVE */}
      </Layout>
    </>
  );
};

export default StationerListe;