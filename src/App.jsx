import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <Router>
    <Routes>
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/" element={<HomePage />} />
    </Routes>
    </Router>
  );
}

export default App;
