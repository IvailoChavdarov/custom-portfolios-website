import Signup from './components/Signup/Signup.js';
import Homepage from './components/Homepage/Homepage.js';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
        <nav>topnav</nav>
        <Routes>
            <Route path="/" element={<Homepage/>} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
