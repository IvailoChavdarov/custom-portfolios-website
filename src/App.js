import Signup from './components/Signup/Signup.js';
import HomePage from './components/Homepage/Homepage.js';
import AccountPage from './components/AccountPage/AccountPage.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.js';
import Signin from './components/Signin/Signin.js';
import TopNav from './components/TopNav/TopNav.js';
import "./styles/shared.scss"

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <TopNav/>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/account" element={<AccountPage />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
