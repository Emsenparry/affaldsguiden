import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../Helpers/Helpers";
import pfp from '../../../../Assets/Images/Layout/profilePicture.svg';


const ReviewDetails = () => {
  const [reviewDetails, setReviewDetails] = useState({});
  const { station_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/reviews/details/${station_id}`
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
      {reviewDetails && reviewDetails.user && (
      <section className="wrapper">
        <div>
          <h3>{reviewDetails.subject}</h3>
        <p>{reviewDetails.user.firstname}</p>
        <p>{formatDate(reviewDetails.created_at, true)}</p>
        <div>
          <p>{reviewDetails.comment}</p>
        </div>
      </div>
      <div>
        <img src={pfp} alt="profilepicture" />
      </div>
      </section>
    )}
    </>
  );
};

export default ReviewDetails;
