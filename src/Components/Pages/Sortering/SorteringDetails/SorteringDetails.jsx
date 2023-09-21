import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Layout } from "../../../Layout/Layout";
import DetailsInfo from "./DetailsInfo/DetailsInfo";
import { ContainerStyle } from "../../../Styled/Container.style";
import styles from './SorteringDetails.module.scss'


const SorteringDetails = () => {
  const [data, setData] = useState({});
  const { section_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/section/${section_id}`
        );
        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [section_id]);
  return (
    <>
      <ContainerStyle maxwidth="800">
          {data ? (
            <Layout title={data.title}>
              <article className={styles.container}>
                <figure style={{ backgroundColor: `#${data.color}` }}>
                  <figcaption>
                    <h3>{data.title}</h3>
                  </figcaption>
                  <img
                    src={
                      data && data.filename
                        ? `http://localhost:4000/Assets/Images/Guide/Categories/${data.filename}`
                        : ""
                    }
                    alt="logoimages"
                  />
                </figure>
                <div>
                  <DetailsInfo />
                </div>
              </article>
            </Layout>
          ) : null}
      </ContainerStyle>
    </>
  );
};

export default SorteringDetails;
