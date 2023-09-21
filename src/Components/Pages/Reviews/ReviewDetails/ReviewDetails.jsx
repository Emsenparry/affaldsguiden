import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../Helpers/Helpers";
import pfp from '../../../../Assets/Images/Layout/profilePicture.svg';


const ReviewDetails = () => {
  const [reviewDetails, setReviewDetails] = useState();
  const { station_id } = useParams();
  

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/reviews/${station_id}`
        );
        setReviewDetails(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [station_id]);

  return (
    <>
      {reviewDetails && reviewDetails.map((item) => {
      return(
        <section className="wrapper" key={item.id}>
        <div>
          <h3>{item.subject}</h3>
        <p>{item.user.firstname}</p>
        <p>{formatDate(item.created_at, true)}</p>
        <div>
          <p>{item.comment}</p>
        </div>
      </div>
      <div>
        <img src={pfp} alt="profilepicture" />
      </div>
      </section>
      )
    })}
    </>
  );
};

export default ReviewDetails;
