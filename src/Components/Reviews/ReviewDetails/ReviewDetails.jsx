import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewDetails = () => {
  const [reviewDetails, setReviewDetails] = useState({});
  const { review_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/reviews/details/${review_id}`
        );
        console.log("API Response:", result.data);
        setReviewDetails(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [review_id]);

  return (
    <>
      {reviewDetails && (
        <div>
          <p>{reviewDetails.comment}</p>
        </div>
      )}
    </>
  );
};

export default ReviewDetails;
