import "./WeatherBox.css";

const WeatherBox = ({ weather }) => {
  return (
    <div className="weather-container">
      <div className="weather-box">
        <h2>현재 위치</h2>
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
