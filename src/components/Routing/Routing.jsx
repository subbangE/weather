import { Route, Routes } from "react-router-dom";

import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import HomePage from "../Home/HomePage";
import QnaPage from "../Qna/QnaPage";
import LogoutPage from "../Authentication/LogoutPage";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/qna" element={<QnaPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};

export default Routing;
