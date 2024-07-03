import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth } from "../firebaseConfig";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState();
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      //파이어베이스 로그아웃
      await auth.signOut();
      //로그아웃 액션 디스패치
      dispatch({ type: "LOGOUT" });

      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };

  // 로그아웃 작업중 중간에 사라진다면
  // useEffect의 return이 unmount될때의 작업(클린업)이 된다.
  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
