import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Layout } from '../../../Layout/Layout';
import DetailsInfo from './DetailsInfo/DetailsInfo';

const SorteringDetails = () => {
  const [data, setData] = useState({});;
  const { section_id } = useParams();


  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/section/${section_id}`);
          setData(result.data);

      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [section_id]);
  return (
      <section>
        {data ? (
          <Layout title={data.title}>
            <article>
              <figure>
                <figcaption>
                  <h3>{data.title}</h3>
                </figcaption>
                <img src={data && data.filename ? `http://localhost:4000/Assets/Images/Guide/Categories/${data.filename}` : ''} alt="logoimages" />
              </figure>
              <div>
              <DetailsInfo />
              </div>
            </article>
            </Layout>
        ) : null}
      </section>
  )
}

export default SorteringDetails