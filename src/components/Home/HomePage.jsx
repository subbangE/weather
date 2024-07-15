import { useEffect, useState } from "react";
import WeatherBox from "./WeatherBox";
import WeatherForecastBox from "./WeatherForecastBox";
import { useLocation } from "react-router-dom";
import axios from "axios";
import loadingGIF from "../../assets/loading.gif";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weather, setWeather] = useState(null); // 현재 날씨
  const [forecast, setForecast] = useState(null); // 5일 예보 정보
  const location = useLocation();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}년 ${month}월 ${day}일`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // 1초 간격으로 타이머 설정

    return () => clearInterval(timer); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

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
            console.error("데이터 불러오기 오류:", error);
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
            console.error("데이터 불러오기 오류:", error);
          });
        setLoading(false);
      });
    } else {
      alert("현재 위치를 불러올 수 없습니다.");
    }
  };

  const getWeatherByCity = (city) => {
    let apikey = import.meta.env.VITE_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}&units=metric`;

    axios.get(url).then((data) => {
      setWeather(data);
    });
  };

  const getWeatherForecastByCity = (city) => {
    let apikey = import.meta.env.VITE_API_KEY;
    let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apikey}&units=metric`;

    axios.get(url).then((data) => {
      setForecast(data);
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <img src={loadingGIF} alt="Loading" />
      </div>
    );
  }

  return (
    <div>
      <div>
        {weather && (
          <WeatherBox
            weather={weather}
            currentDate={formatDate(currentDate)}
          ></WeatherBox>
        )}
      </div>
      <div>{forecast && <WeatherForecastBox forecast={forecast} />}</div>
    </div>
  );
};

export default HomePage;
