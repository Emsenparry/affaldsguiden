import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";


const Bestilling = () => {
  const { container_id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const formSubmit = async (formObject) => {
    const endpoint = "http://localhost:4000/orders";

    const formData = new URLSearchParams();
    formData.append("container_id", container_id);
    formData.append("fullname", formObject.fullname);
    formData.append("address", formObject.address);
    formData.append("zipcode", formObject.zipcode);
    formData.append("city", formObject.city);
    formData.append("email", formObject.email);
    formData.append("phone", formObject.phone);
    console.log(...formData);


    try {
      const result = await axios.post(endpoint, formData);
      if (result.data) {
        console.log(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(formSubmit)}>
        <input type="hidden" value={container_id} {...register("container_id")} />
        <div>
          <label htmlFor="fullname">Fornavn:</label>
          <input
            {...register("fullname", {
              required: "Du skal indtaste dit fuldenavn",
              pattern: {
                value: /^[A-Za-z]+$/i,
                message: "Du skal indtaste et gyldigt navn",
              },
            })}
          />
          {errors.fullname && <span>{errors.fullname.message}</span>}
        </div>

        <div>
          <label htmlFor="address">Adresse:</label>
          <input
            {...register("address", {
              required: "Du skal indtaste din adresse",
            })}
          />
          {errors.address && <span>{errors.address.message}</span>}
        </div>

        <div>
          <label htmlFor="zipcode">Postnummer:</label>
          <input
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
          {errors.zipcode && <span>{errors.zipcode.message}</span>}
        </div>

        <div>
          <label htmlFor="city">By:</label>
          <input
            {...register("city", {
              required: "Du skal indtaste et bynavn",
            })}
          />
          {errors.city && <span>{errors.city.message}</span>}
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            {...register("email", {
              required: "Du skal indtaste din email",
              pattern: {
                value: /^\S+@\S+$/,
                message: "Du skal indtaste en gyldig mailadresse",
              },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            {...register("phone", {
              required: "Du skal indtaste dit telefon nummer",
              pattern: {
                value: /^[0-9]{8}$/,
                message: "Du skal indtaste et gyldig telefonnummer",
              },
            })}
          />
          {errors.phone && <span>{errors.phone.message}</span>}
        </div>

        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
}

export default Bestilling;
