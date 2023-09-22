import axios from "axios";
import { useAuth } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import { Stars } from "../../../Helpers/Helpers";
import { useState } from "react";
import styles from "./ReviewPost.module.scss";
import commentIcon from "../../../../Assets/Images/Layout/icon-speech-bubble.svg";
import { ContainerStyle } from "../../../Styled/Container.style";

const ReviewPost = (props) => {
  // Henter brugerens loginoplysninger fra brugerauthentificeringskonteksten
  const { loginData } = useAuth();
  // Tilstand til at gemme rating
  const [rating, setRating] = useState(null);

  // Validering til formen
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Opretter en ny dato med den aktuelle dato og tidspunkt
  const currentDate = new Date();

  // Funktion til at håndtere formularindsendelse
  const formSubmit = async (data) => {
    // Opretter en URLSearchParams-objekt til at sende formdata
    const formData = new URLSearchParams();
    // Tilføjer organisationens ID til formdata
    formData.append("org_id", props.org_id);
    // Tilføjer emnet fra formularen til formdata
    formData.append("subject", data.subject);
    formData.append("comment", data.comment);
    formData.append("num_stars", rating);
    formData.append("date", currentDate.toISOString());
    // Logger formdata til konsollen for fejlfinding
    console.log(...formData);

    const options = {
      headers: {
        // Sætter token i headers til API-anmodningen
        Authorization: `Bearer ${loginData.access_token}`,
      },
    };

    try {
      const result = await axios.post(
        `http://localhost:4000/reviews`,
        formData,
        options
      );
      // Udfører en POST-anmodning til API'en med formdata og autorisationstoken
      if (result.data) {
        console.log(result.data);
      }
    } catch (err) {
      // Håndterer eventuelle fejl og logger dem til konsollen
      console.error(`Fejl i Review ${err}`);
    }
  };

  return (
    <section className={styles.mainSection}>
      <h2>Skriv en anmeldelse</h2>
      <form onSubmit={handleSubmit(formSubmit)}>
        <ContainerStyle maxwidth="700">
          <div className={styles.wrapper}>
            <div>
              <input
                type="text"
                placeholder="Skriv en titel"
                {...register("subject", { required: true, maxLength: 200 })}
              />
              {errors.subject && (
                <>
                  <span className={styles.error}>Du skal skrive en titel</span>
                </>
              )}
            </div>
            <div className={styles.stars}>
              <Stars rating={rating} setRating={setRating} />
            </div>
          </div>
          <div className={styles.textArea}>
            <textarea
              {...register("comment", { required: true })}
              placeholder="Skriv en kommentar"
              rows="10"
              cols="100"
            ></textarea>
          </div>
          {errors.comment && (
            <span className={styles.error}>Du skal skrive en kommentar</span>
          )}
          <div className={styles.commentBtn}>
            <button>
              <img src={commentIcon} alt="speechbubble" />
              Kommenter
            </button>
          </div>
        </ContainerStyle>
      </form>
    </section>
  );
};

export default ReviewPost;
