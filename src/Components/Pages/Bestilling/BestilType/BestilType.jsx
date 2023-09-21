import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../../Layout/Layout";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ContainerStyle } from "../../../Styled/Container.style";
import styles from "./BestilType.module.scss";
import stepOne from "../../../../Assets/Images/Layout/Nav-step1.svg";
import wave from "../../../../Assets/Images/Layout/bg-wave-1.svg";

const BestilType = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const url = `http://localhost:4000/containers`;

    const getData = async () => {
      try {
        const result = await axios.get(url);

        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [setData]);

  const onSubmit = (data) => {
    console.log(data);
    navigate(data.radio);
  };

  return (
    <Layout title="Vælg type">
      <ContainerStyle maxwidth="1000">
        <section>
          <form onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.wrapper}>
              <div className={styles.divider}>
                <div className={styles.stepOneBox}>
                  <img src={stepOne} alt="stepOne" />
                </div>
              </div>
              <div className={styles.dividerTwo}>
                <div className={styles.info}>
                  <h5>Trin 1</h5>
                  <h2>Vælg Type</h2>
                  <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id
                    minus vitae enim, quidem illo, magnam, saepe voluptate neque
                    harum exercitationem illum blanditiis expedita. Adipisci,
                    labore ex corporis nobis ab fugiat.
                  </p>
                </div>
                <figure className={styles.chooseType}>
                  {data &&
                    data.map((item) => {
                      return (
                        <div className={styles.typeIcons} key={item.id}>
                          <article>
                            <input
                              type="radio"
                              {...register("radio", { required: true })}
                              value={item.id}
                            />
                            <div className={styles.imageFlex}>
                              <img
                                src={`http://localhost:4000/Assets/Images/Icons/${item.icon_filename}`}
                                alt={item.name}
                              />
                            </div>
                            <figcaption>
                              <p>{item.name}</p>
                            </figcaption>
                          </article>
                        </div>
                      );
                    })}
                  {errors.radio && (
                    <span className={styles.error}>Du skal vælge en type!</span>
                  )}
                </figure>
                <div className={styles.next}>
                  <button type="submit">Videre</button>
                </div>
              </div>
            </section>
          </form>
        </section>
      </ContainerStyle>
      <img className={styles.wave} src={wave} alt="wave" />
    </Layout>
  );
};

export default BestilType;
