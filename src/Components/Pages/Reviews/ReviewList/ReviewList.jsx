import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const ReviewList = (props) => {
  const [avg, setAvg] = useState([]);
  const { org_id } = props;

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/reviews/${org_id}`
        );
       
        const combined = result.data.reduce((result, data) => {
          result += data.num_stars;
          return result;
        }, 0);
        
        const avg = combined / result.data.length;
        setAvg(avg);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [org_id]);

  return (
    <NumStars num_stars={avg} />
  )
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
