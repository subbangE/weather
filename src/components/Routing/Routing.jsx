import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import HomePage from "../Home/HomePage";
import QnaPage from "../Qna/QnaPage";
import LogoutPage from "../Authentication/LogoutPage";

const Routing = ({ user }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route path="/home" element={<HomePage />} />
      <Route
        path="/signup"
        element={!user ? <SignupPage /> : <Navigate to="/" />}
      />
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/" />}
      />
      <Route
        path="/qna"
        element={user ? <QnaPage /> : <Navigate to="/login" />}
      />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};

export default Routing;
