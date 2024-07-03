import { useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useEffect } from "react";

const LogoutPage = () => {
  const { logout } = useLogout();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = () => {
      if (window.confirm("정말 로그아웃 하시겠습니까?")) {
        logout();
        navigate("/login");
      } else {
        navigate("/");
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return null; // 컴포넌트 자체는 아무것도 렌더링하지 않습니다.
};

export default LogoutPage;
