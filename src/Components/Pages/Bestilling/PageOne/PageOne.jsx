import React, { useState, useEffect } from "react";
import { Layout } from "../../../Layout/Layout";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useParams, useNavigate } from "react-router-dom"; // Import useHistory

const PageOne = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const { container_id } = useParams();
  const navigate = useNavigate(); // Initialize useHistory

  useEffect(() => {
    const fetchData = async () => {
      try {
        const api_endpoint = `http://localhost:4000/containers`;
        const response = await axios.get(api_endpoint);
        if (response.data) {
          setData(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const formSubmit = async (formObject) => {
    const api_endpoint = `http://localhost:4000/containers/${container_id}`;

    const formData = new URLSearchParams();
    formData.append("container_id", container_id);
    formData.append("radio", formObject.radio);

    try {
      await axios.post(api_endpoint, formData);
      // Pass the selected radio value to PageTwo using URL parameters
      navigate.push(`/vælgtype/${container_id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout title="Vælg type">
      <form onSubmit={handleSubmit(formSubmit)}>
        {data &&
          data.map((item) => {
            return (
              <section key={item.id}>
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
                </div>
              </section>
            );
          })}
        <Link to="vælgtype">
        <button type="submit">Videre</button>
        </Link>
      </form>
    </Layout>
  );
};

export default PageOne;
