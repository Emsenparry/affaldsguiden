import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

export const formatDate = (dateString, includeYear) => {
    const date = new Date(dateString);
    const options = {
      month: "short",
      day: "numeric",
    };
    if (includeYear) {
      options.year = "numeric";
    }
    return date.toLocaleDateString("da-DK", options);
  };


export const Stars = ({ rating, setRating }) => {
    const [rateColor] = useState(null);
    return (
      <>
        {[...Array(5)].map((star, index) => {
          const currentRate = index + 1;
          return (
            <React.Fragment key={index}>
              <label>
                <input
                  type="radio"
                  name="rate"
                  value={currentRate}
                  checked={currentRate === rating} // Use the rating prop to set checked state
                  onChange={() => setRating(currentRate)}
                />
  
                <AiFillStar
                  size={50}
                  color={currentRate <= (rateColor || rating) ? "yellow" : "grey"}
                />
              </label>
            </React.Fragment>
          );
        })}
      </>
    );
  };