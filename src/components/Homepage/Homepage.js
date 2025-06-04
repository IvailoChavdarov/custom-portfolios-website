import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {db} from "../../firebase.js";
import testBannerImage from "../../images/laptop-windows-11-3840x2160-10874.jpg"


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
      {/* test homepage banner idea */}
      <div style={{height:'100vh'}}>
        <img style={{position:'absolute', top:'0', width:'100vw', maxHeight: '100vh'}} src={testBannerImage} alt="test banner"/>
      </div>
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