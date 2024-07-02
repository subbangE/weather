import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import WeatherBox from "./WeatherBox";
import WeatherForecastBox from "./WeatherForecastBox";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [weather, setWeather] = useState(null); // 현재 날씨
  const [forecast, setForecast] = useState(null); // 5일 예보 정보
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search");
    if (search) {
      getWeatherByCity(search);
      getWeatherForecastByCity(search);
    } else {
      getCurrentLocationData();
    }
  }, [location.search]);

  // 현재 위치 정보와 예보 정보를 한 번에 가져오는 함수
  const getCurrentLocationData = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apikey = import.meta.env.VITE_API_KEY;

        // 현재 날씨 정보 가져오기
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
          )
          .then((data) => {
            setWeather(data);
          })
          .catch((error) => {
            console.error("Error fetching current weather data:", error);
          });

        // 5일 예보 정보 가져오기
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
          )
          .then((data) => {
            setForecast(data);
          })
          .catch((error) => {
            console.error("Error fetching forecast data:", error);
          });
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const getWeatherByCity = (city) => {
    let apikey = import.meta.env.VITE_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    axios.get(url).then((data) => {
      setWeather(data);
      console.log(data);
    });
  };

  const getWeatherForecastByCity = (city) => {
    let apikey = import.meta.env.VITE_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

    axios.get(url).then((data) => {
      setForecast(data);
      console.log(data);
    });
  };

  return (
    <div>
      <div>{weather && <WeatherBox weather={weather}></WeatherBox>}</div>
      <div>{forecast && <WeatherForecastBox forecast={forecast} />}</div>
    </div>
  );
};

export default HomePage;
