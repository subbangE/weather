import "./WeatherForecastBox.css";

const WeatherForecastBox = ({ forecast }) => {
  return (
    <div className="forecast-container">
      <h2>시간별 날씨</h2>
      <div className="forecast-items">
        {forecast?.data.list.slice(0, 6).map((item) => (
          <div key={item.dt_txt} className="forecast-item">
            <div>{item.dt_txt}</div>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            />
            <div>{Math.round(item.main.temp)} °C</div>
            <div>{item.weather[0].description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecastBox;
