import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const {currentUser, signout} = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  function logout(){
    setLoading(true)
    signout()
    navigate('/');
  }
  useEffect(() => {
     
    }, []);

  return (
    <>
      <h1>Account</h1>
      <div>
            Email: {currentUser.email}
      </div>
      <Button onClick={logout} disabled={loading}>Sign out</Button>
    </>
  );
}

export default AccountPage;