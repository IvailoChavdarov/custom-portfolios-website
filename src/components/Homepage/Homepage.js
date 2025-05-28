import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {db} from "../../firebase.js";

function Homepage() {
  const [technologies, setTechnologies] = useState([]);
  
  useEffect(() => {
      async function fetchTechnologies() {
        const querySnapshot = await getDocs(collection(db, 'technologies'));
        const techArray = [];
        querySnapshot.forEach((doc) => {
          techArray.push(doc.data());
        });
        setTechnologies(techArray);
      }

      fetchTechnologies();
    }, []);

  return (
    <>
      <h1>technologies - db test</h1>
      <div>
        {technologies.map((tech, index) => (
          <div key={index}>{tech.name}</div>
        ))}
      </div>
    </>
  );
}

export default Homepage;