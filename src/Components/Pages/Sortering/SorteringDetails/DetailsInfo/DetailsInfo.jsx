import axios from "axios";
import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

const DetailsInfo = () => {
  const [categories, setCategories] = useState([]);
  // const { section_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/section?incl_categories=true&incl_types=true`
        );
        setCategories(result.data[0].categories); // Access categories from the first item in the array
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [setCategories]);

  return (
    <div>
      {categories && categories.map((item) => (
        <p key={item.title}>{item.title}</p>
      ))}
    </div>
  );
};

export default DetailsInfo;
