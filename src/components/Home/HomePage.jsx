import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import WeatherBox from "./WeatherBox";
import WeatherForecastBox from "./WeatherForecastBox";

const Home = () => {
  const [weather, setWeather] = useState(null); // 현재 날씨
  const [forecast, setForecast] = useState(null); // 5일 예보 정보

  // 현재 위치 받아오는 함수
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude; // 위도 (변경되는 값이기 때문에 let 사용)
        let lon = position.coords.longitude; // 경도

        let apikey = import.meta.env.VITE_API_KEY;

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
          )
          .then((data) => {
            setWeather(data);
          });
      });
    } else {
      alert("사용 불가");
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  // 5일 예보 정보
  const getCurrentLocationForecast = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let lat = position.coords.latitude; // 위도 (변경되는 값이기 때문에 let 사용)
        let lon = position.coords.longitude; // 경도

        let apikey = import.meta.env.VITE_API_KEY;

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
          )
          .then((data) => {
            setForecast(data);
          });
      });
    } else {
      alert("사용 불가");
    }
  };

  useEffect(() => {
    getCurrentLocationForecast();
  }, []);

  return (
    <div>
      <div>{weather && <WeatherBox weather={weather}></WeatherBox>}</div>
      <div>{forecast && <WeatherForecastBox forecast={forecast} />}</div>
    </div>
  );
};

export default Home;
