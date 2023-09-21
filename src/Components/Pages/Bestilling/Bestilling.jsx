import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Layout } from "../../Layout/Layout";
import { ContainerStyle } from "../../Styled/Container.style";
import wave from "../../../Assets/Images/Layout/bg-wave-1.svg";
import styles from "./Bestilling.module.scss";
import { useState } from "react";
import stepTwo from "../../../Assets/Images/Layout/Nav-step2.svg";

const Bestilling = () => {
  const { container_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isSubmitted, setIsSubmitted] = useState(false);

  const formSubmit = async (formObject) => {
    const endpoint = "http://localhost:4000/orders";

    const formData = new URLSearchParams();
    formData.append("container_id", container_id);
    formData.append("fullname", formObject.fullname);
    formData.append("phone", formObject.phone);
    formData.append("email", formObject.email);
    formData.append("address", formObject.address);
    formData.append("city", formObject.city);
    formData.append("zipcode", formObject.zipcode);
    console.log(...formData);

    try {
      const result = await axios.post(endpoint, formData);
      setIsSubmitted(true);
      if (result.data) {
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title="Bestil">
      <ContainerStyle maxwidth="1000">
        {isSubmitted ? (
          <div>
            <p>Tak for din bestilling!</p>
          </div>
        ) : (
          <section>
            <form onSubmit={handleSubmit(formSubmit)}>
              <section className={styles.wrapper}>
                <div className={styles.divider}>
                  <div className={styles.stepOneBox}>
                    <img src={stepTwo} alt="stepTwo" />
                  </div>
                </div>
                <div className={styles.dividerTwo}>
                  <div className={styles.info}>
                    <h5>Trin 2</h5>
                    <h2>Hvor skal den leveres?</h2>
                    <p>
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Id minus vitae enim, quidem illo, magnam, saepe voluptate
                      neque harum exercitationem illum blanditiis expedita.
                      Adipisci, labore ex corporis nobis ab fugiat.
                    </p>
                  </div>
                  <div className={styles.inputBox}>
                    <input
                      type="hidden"
                      value={container_id}
                      {...register("container_id")}
                    />
                    <div>
                      <input
                        placeholder="Navn"
                        {...register("fullname", {
                          required: "Du skal indtaste dit fuldenavn",
                          pattern: {
                            value: /^[A-Za-z]+$/i,
                            message: "Du skal indtaste et gyldigt navn",
                          },
                        })}
                      />
                      {errors.fullname && (
                        <span className={styles.error}>
                          {errors.fullname.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Email"
                        {...register("email", {
                          required: "Du skal indtaste din email",
                          pattern: {
                            value: /^\S+@\S+$/,
                            message: "Du skal indtaste en gyldig mailadresse",
                          },
                        })}
                      />
                      {errors.email && (
                        <span className={styles.error}>
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Telefon"
                        {...register("phone", {
                          required: "Du skal indtaste dit telefon nummer",
                          pattern: {
                            value: /^[0-9]{8}$/,
                            message: "Du skal indtaste et gyldig telefonnummer",
                          },
                        })}
                      />
                      {errors.phone && (
                        <span className={styles.error}>
                          {errors.phone.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Addresse"
                        {...register("address", {
                          required: "Du skal indtaste din adresse",
                        })}
                      />
                      {errors.address && (
                        <span className={styles.error}>
                          {errors.address.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="By"
                        {...register("city", {
                          required: "Du skal indtaste et bynavn",
                        })}
                      />
                      {errors.city && (
                        <span className={styles.error}>
                          {errors.city.message}
                        </span>
                      )}
                    </div>

                    <div>
                      <input
                        placeholder="Postnummer"
                        {...register("zipcode", {
                          required: "Du skal indtaste dit postnummer",
                          pattern: {
                            value: /^[0-9]+$/i,
                            message: "Du skal indtaste et gyldigt postnummer",
                          },
                          min: {
                            value: 999,
                            message: "Postnummer kan ikke være mindre end 1000",
                          },
                          max: {
                            value: 9990,
                            message: "Postnummer kan ikke være større end 9990",
                          },
                        })}
                      />
                      {errors.zipcode && (
                        <span className={styles.error}>
                          {errors.zipcode.message}
                        </span>
                      )}
                    </div>

                    <div className={styles.send}>
                      <button>Send</button>
                    </div>
                  </div>
                </div>
              </section>
            </form>
          </section>
        )}
      </ContainerStyle>
      <img className={styles.wave} src={wave} alt="wave" />
    </Layout>
  );
};

export default Bestilling;
