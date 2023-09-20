import React, { useState, useEffect } from "react";
import { Layout } from "../../../Layout/Layout";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom"; 

const BestilType = () => {
  const {
    register,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);

  useEffect(() => {
    const url = `http://localhost:4000/containers`;

    const getData = async () => {
      try {
        const result = await axios.get(url);
        console.log(result);

        setData(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [setData]);

  return (
    <Layout title="Vælg type">
      {data &&
        data.map((item) => {
          return (
            <div key={item.id}>
              <input
                type="radio"
                {...register("radio", { required: true })}
                value={item.id}
              />
              <p>{item.name}</p>
              <img
                src={`http://localhost:4000/Assets/Images/Icons/${item.icon_filename}`}
                alt={item.name}
              />
              {errors.radio && <span>Du skal vælge en type!</span>}

            </div>
          );
        })}
        {data ? (
          <Link to={`/bestil/${data.container_id}`}>
          <button type="submit">Videre</button>
        </Link>
        ) : null}
    </Layout>
  );
};

export default BestilType;
