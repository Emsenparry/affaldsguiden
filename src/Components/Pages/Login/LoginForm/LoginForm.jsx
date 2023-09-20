import axios from "axios";
import { useAuth } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import './LoginForm.scss'
import { Layout } from "../../../Layout/Layout";
import { BsFillEyeFill } from 'react-icons/bs'
import { BsFillEyeSlashFill } from 'react-icons/bs'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { loginData, setLoginData } = useAuth();
  const [open, setOpen] = useState(false)

  
  const toggle = () => {
    setOpen(!open)
  }

  const formSubmit = async (e) => {
    const formData = new URLSearchParams();
    formData.append("username", e.username);
    formData.append("password", e.password);
    const endpoint = `http://localhost:4000/login`;

    try {
      const result = await axios.post(endpoint, formData);
      handleSessionData(result.data);
    } catch (err) {
      console.error(`Kunne ikke logge ind: ${err}`);
    }
  };

  const handleSessionData = async (data) => {
    if (data) {
      sessionStorage.setItem("token", JSON.stringify(data));
      setLoginData(data);
    }
  };

  const Logout = () => {
    sessionStorage.removeItem("token");
    setLoginData("");
    reset();
  };

  return (
    <>
      <Layout title="Login">
      <section className="container">
        <h1>Log ind</h1>
        {!loginData ? (
          <form
            method="POST"
            onSubmit={handleSubmit(formSubmit)}
            className="loginForm"
          >
              <input
                type="text"
                placeholder="E-mail"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <p className="error">Indtast dit brugernavn!</p>
              )}
            <div className="wrapper">
              <div className="box">
                <input
                type={(open === false) ? 'password' : 'text'}
                id="passwordToggle"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              <span className="eyeIcon">
                {
                  (open === false) ? <BsFillEyeFill onClick={toggle} /> : <BsFillEyeSlashFill onClick={toggle}  />
                }
              </span>
                </div>
              </div>
            {errors.password && (
                <p className="error">Indtast din adgangskode!</p>
              )}

            <div className="buttonLogin">
              <button type="submit">Log ind</button>
            </div>
          </form>
          
        ) : (
          <Layout title="Min Side">
            <div className="logOutContainer">
              <p>{`Du er logget på som: ${loginData.user.firstname} ${loginData.user.lastname}`}</p>
              <button onClick={() => Logout()} className="logOutBtn">
                Log ud
              </button>
            </div>
          </Layout>
        )}
        </section>
      </Layout>
    </>
  );
};

export default LoginForm;