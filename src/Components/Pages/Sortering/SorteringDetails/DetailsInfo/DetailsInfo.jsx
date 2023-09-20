import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsInfo = () => {
  const [section, setsection] = useState({});
  const { section_id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          `http://localhost:4000/section/${section_id}`
        );
        setsection(result.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [section_id]);

  return (
    <div>
      {section ? (
        <>
          <p>{section.title}</p>
          {section.categories &&
            section.categories.map((item) => (
              <div key={item.id}>
                <img
                  src={`http://localhost:4000/Assets/Images/Guide/Icons/${item.icon_filename}`}
                  alt=""
                />
                <p key={item.id}>{item.title}</p>
              </div>
            ))}
        </>
      ) : null}
    </div>
  );
};

export default DetailsInfo;
