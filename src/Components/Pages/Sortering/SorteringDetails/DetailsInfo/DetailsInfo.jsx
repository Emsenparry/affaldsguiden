import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const DetailsInfo = () => {
  const [section, setSection] = useState({});
  const [rules, setRules] = useState([]); 
  const { section_id, category_id } = useParams(); 

  useEffect(() => {
    const getData = async () => {
      try {
        
        const result = await axios.get(
          `http://localhost:4000/section/${section_id}`
        );
        setSection(result.data);

        const rulesResult = await axios.get(
          `http://localhost:4000/types/${section_id}/${category_id}?limit=1`
        );
        setRules(rulesResult.data);
      } catch (err) {
        console.error(err);
      }
    };
    getData();
  }, [section_id, category_id]);

  return (
    <div>
      {section ? (
        <>
          <p>{section.title}</p>
          {section.categories &&
            section.categories.map((category) => (
              <div key={category.id}>
                <img
                  src={`http://localhost:4000/Assets/Images/Guide/Icons/${category.icon_filename}`}
                  alt=""
                />
                <p>{category.title}</p>
              </div>
            ))}
        </>
      ) : null}

      
{rules && (
  <div>
    <ul>
      {rules.map((item) => (
        <li key={item.id}>
          {item.categories && (
            <ul>
              {item.categories.map((category) => (
                <li key={category.id}>
                  {category.rules && (
                    <p>
                      {category.rules.is_allowed.toString()}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  </div>
)}

    </div>
  );
};

export default DetailsInfo;
