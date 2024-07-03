import "./WeatherBox.css";

const WeatherBox = ({ weather, currentDate }) => {
  return (
    <div className="weather-container">
      <div className="weather-box">
        <h3>{currentDate}</h3>
        <h2>현재 날씨</h2>
        <div className="location">{weather?.data.name}</div>
        <div className="temperature">{`${Math.round(
          weather?.data.main.temp
        )}°C`}</div>

        <img
          src={`http://openweathermap.org/img/wn/${weather?.data.weather[0].icon}@2x.png`}
          alt="Weather Icon"
        />
        <div className="description">
          {weather?.data.weather[0].description}
        </div>
      </div>
    </div>
  );
};

export default WeatherBox;
