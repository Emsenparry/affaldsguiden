import { React, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReviewDetails from "../../Reviews/ReviewDetails/ReviewDetails";

const StationerDetails = () => {
  const [data, setdata] = useState({});
  const { station_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/orgs/${station_id}`);
        setdata(result.data);
        
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [station_id]);

  return (
      <section>
        {data && (
          <div key={station_id}>
            <div>
              <iframe
                title="googlemapsimage"
                className="googleMaps"
                src={`https://maps.google.com/maps?q=${data.longtitude},${data.latitude}&hl=es;&output=embed`}
              ></iframe>
            </div>
            <div>
              <h3>{data.name}</h3>
              <p>{data.address}</p>
              <p>
                {data.zipcode} {data.city}
              </p>
              <p>{data.country}</p>
            </div>
            <ReviewDetails />
          </div>
        )}
      </section>
  );
};

export default StationerDetails;