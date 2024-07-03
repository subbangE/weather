import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

//미리 useContext와 AuthContext를 가져옴 (편리하도록)
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext는 AuthContextProvider 내에서만 사용가능");
  }

  return context;
};
