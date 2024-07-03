import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAD-EDfZ5LK30Sl_cjn5ZpspteZaCr_40Q",
  authDomain: "weather-32cab.firebaseapp.com",
  projectId: "weather-32cab",
  storageBucket: "weather-32cab.appspot.com",
  messagingSenderId: "70337759870",
  appId: "1:70337759870:web:69ff04442e2ab3be1ba62f",
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 객체 가져오기
const auth = getAuth(app);

export { auth };
