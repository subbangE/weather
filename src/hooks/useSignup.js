import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  const signup = async (email, password, name) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("가입 중 오류가 발생하였습니다😂");
    }

    await updateProfile(res.user, { name });
  };

  return { signup };
};
