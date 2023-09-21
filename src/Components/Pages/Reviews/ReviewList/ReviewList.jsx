import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewList = (props) => {
  const [reviewList, setReviewList] = useState([]);
  const { org_id } = props;

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/reviews/${org_id}`
        );
        setReviewList(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [org_id]);

  return (
    <>
      {reviewList &&
        reviewList.slice(0,1).map((data) => {
          return (
            <article key={data.id}>
              <NumStars num_stars={data.num_stars} />
            </article>
          );
        })}
    </>
  );
};

const NumStars = (props) => {
  const [numStars] = useState(new Array(5).fill(""));

  return (
    <div>
      {numStars &&
        numStars.map((star, i) => {
          return (
            <div key={i}>
              {i > props.num_stars - 1 ? (
                <>
                  <AiOutlineStar />
                </>
              ) : (
                <AiFillStar />
              )}
            </div>
          );
        })}
    </div>
  );
};

export default ReviewList;
