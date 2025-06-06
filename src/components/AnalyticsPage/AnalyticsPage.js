import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from "../../firebase.js";
import UsersCountChart from '../UsersCountChart/UsersCountChart.js';
import UsersCountBox from '../UsersCountBox/UsersCountBox.js';
import { Container } from 'react-bootstrap';
import "./AnalyticsPage.scss"

function AnalyticsPage() {
    //get data for registered users chart
    const [developersCount, setDevelopersCount] = useState(0);
    const [recruitersCount, setRecruitersCount] = useState(0);
    const [profilesCount, setProfilesCount] = useState(0);
    useEffect(() => {
      async function fetchUserCount() {
        const usersData = await getDocs(collection(db, "profiles"))
        let devs = 0;
        let recruiters = 0;

        usersData.forEach(doc => {
          const data = doc.data();
          if (data.profileType === 'developer') devs++;
          if (data.profileType === 'recruiter') recruiters++;
        });
        setDevelopersCount(devs);
        setRecruitersCount(recruiters);
        setProfilesCount(devs+recruiters);
      }
      fetchUserCount();
    }, []);


  return (
    <>
      <h1>Website analytics</h1>
      <Container className='analytics-container'>
        <UsersCountBox count={profilesCount}/>
        <UsersCountChart developersCount={developersCount} recruitersCount={recruitersCount}/>
      </Container>
    </>
  );
}

export default AnalyticsPage;