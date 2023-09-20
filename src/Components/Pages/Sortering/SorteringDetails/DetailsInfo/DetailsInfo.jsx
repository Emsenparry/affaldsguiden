import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsInfo = () => {
  const [category, setcategory] = useState({});
  const { section_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/section/${section_id}`
        );
        setcategory(result.data); 
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [section_id]);

  return (
    <div>
      {category ? (
        <p>{category.title}</p>
      ) : null}
    </div>
  );
};

export default DetailsInfo;
