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
    const getData = async () => {
      try {
        const result = await axios.get(`http://localhost:4000/containers`);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, [setData]);

  return (
    <Layout title="Vælg type">
      {data &&
        data.map((item) => {
          return (
            <div>
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

              <Link to={`/bestil/${item.id}`}>
                <button type="submit">Videre</button>
              </Link>
            </div>
          );
        })}
    </Layout>
  );
};

export default BestilType;
