import axios from "axios";
import { useAuth } from "../../../Providers/AuthProvider";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import './LoginForm.scss'
import { Layout } from "../../../Layout/Layout";
import { BsFillEyeFill } from 'react-icons/bs'
import { BsFillEyeSlashFill } from 'react-icons/bs'

const LoginForm = () => {
  // Opsætning af formularhåndtering med react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // Bruger brugerdefineret hook til at få adgang til login-data og funktioner
  const { loginData, setLoginData } = useAuth();
   // Tilstand til at håndtere visning/skjulning af adgangskodefelt
  const [open, setOpen] = useState(false)

  // Funktion til at skifte visning/skjulning af adgangskodefelt
  const toggle = () => {
    setOpen(!open)
  }

  // Funktion, der udføres ved indsendelse af formular
  const formSubmit = async (e) => {
    // Opretter formdata-objekt til at sende brugernavn og adgangskode
    const formData = new URLSearchParams();
    formData.append("username", e.username);
    formData.append("password", e.password);
    const endpoint = `http://localhost:4000/login`;

    try {
      // Udfør en POST-anmodning til API'en med formdata
      const result = await axios.post(endpoint, formData);
      handleSessionData(result.data);
    } catch (err) {
      console.error(`Kunne ikke logge ind: ${err}`);
    }
  };

  // Funktion til at håndtere sessiondata efter vellykket login
  const handleSessionData = async (data) => {
    if (data) {
      sessionStorage.setItem("token", JSON.stringify(data));
      setLoginData(data);
    }
  };

  // Funktion til at logge brugeren ud
  const Logout = () => {
    // Sletter token fra sessionStorage
    sessionStorage.removeItem("token");
    setLoginData("");
    //Resetter formen efter man logger ud
    reset();
  };

  return (
    <>
      <Layout title="Login">
      <section className="container">
        <h1>Log ind</h1>
        {/* Conditional ternary operator til at vise login-formular eller brugeroplysninger
          Hvis bruger IKKE er logget ind, så vis formen. 
          Hvis bruger er logget på, vis firstname, lastname & logout BTN
        */}
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
          // Viser brugeroplysninger og logud-knap, hvis brugeren er logget ind
          <Layout title="Min Side">
            <div className="logOutContainer">
              {/* Henter firstname og lastname ud fra user */}
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