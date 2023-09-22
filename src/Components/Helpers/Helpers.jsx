import React, { useState } from "react";
import { AiFillStar } from "react-icons/ai";

// Funktion til at formatere en dato i kortformat (måned og dag) med mulighed for at inkludere år
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

// Komponent til at vise stjerner og håndtere værdi
export const Stars = ({ rating, setRating }) => {
  const [rateColor] = useState(null);

  return (
    <div>
      {/* Opretter et array med 5 elementer og mapper over det */}
      {[...Array(5)].map((star, index) => {
        // Beregner den aktuelle værdi ved at tilføje 1 til index (0-baseret)
        const currentRate = index + 1;

        return (
          <React.Fragment key={index}>
            <label>
              <input
                type="radio"
                name="rate"
                value={currentRate}
                // Bruger rating prop til at sætte checked-tilstanden
                checked={currentRate === rating} 
                // Kalder setRating-funktionen med den aktuelle værdi
                onChange={() => setRating(currentRate)} 
                style={{ display: 'none' }}
              />

              {/* Visning af stjerneikon baseret på den aktuelle værdi og farven */}
              <AiFillStar
                size={20}
                // Denne linje sætter farven på stjerneikonet (AiFillStar) baseret 
                // på den aktuelle værdi (currentRate) i forhold til enten rateColor eller rating.

                // rating er en prop, der passeret til komponenten og repræsenterer den aktuelle værdi (eller den værdi, der er valgt).
                color={currentRate <= (rateColor || rating) ? "yellow" : "grey"}
              />
            </label>
          </React.Fragment>
        );
      })}
    </div>
  );
};
