import Signup from './components/Signup/Signup.js';
import HomePage from './components/Homepage/Homepage.js';
import AccountPage from './components/AccountPage/AccountPage.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
          <nav>topnav</nav>
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/account" element={<AccountPage />} />
          </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
