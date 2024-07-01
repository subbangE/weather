import { Route, Routes } from "react-router-dom";

// import HomePage from "../Home/HomePage";
import LoginPage from "../Authentication/LoginPage";
// import SignupPage from "../Authentication/SignupPage";

const Routing = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<HomePage />} /> */}
      {/* <Route path="/signup" element={<SignupPage />} /> */}
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default Routing;
