import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "../Authentication/LoginPage";
import SignupPage from "../Authentication/SignupPage";
import HomePage from "../Home/HomePage";
import QnaListPage from "../Qna/QnaListPage";
import QnaCreatePage from "../Qna/QnaCreatePage";
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
        element={user ? <QnaListPage /> : <Navigate to="/login" />}
      />
      <Route path="/logout" element={<LogoutPage />} />
      <Route
        path="/create"
        element={
          user ? <QnaCreatePage user={user} /> : <Navigate to="/login" />
        }
      />
    </Routes>
  );
};

export default Routing;
