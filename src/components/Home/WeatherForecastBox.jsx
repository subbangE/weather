import "./WeatherForecastBox.css";

const WeatherForecastBox = ({ forecast }) => {
  // 예보 데이터를 반복하여 출력

  console.log(forecast);
  console.log(forecast?.data.list[0].dt_text);
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

      {/* <div className="forecast-items">{forecast?.data.list[0].dt_txt}</div>
      <img
        src={`http://openweathermap.org/img/wn/${forecast?.data.list[0].weather[0].icon}@2x.png`}
        alt="Weather Icon"
      ></img>
      <div>{forecast?.data.list[0].main.temp}</div>
      <div>{forecast?.data.list[0].weather[0].description}</div> */}
    </div>
  );
};

export default WeatherForecastBox;
