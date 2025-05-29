import { useAuth } from '../../contexts/AuthContext';
import { useEffect, useState } from 'react';

function AccountPage() {
  const {currentUser} = useAuth();
  
  useEffect(() => {
     
    }, []);

  return (
    <>
      <h1>Account</h1>
      <div>
            Email: {currentUser.email}
      </div>
    </>
  );
}

export default AccountPage;