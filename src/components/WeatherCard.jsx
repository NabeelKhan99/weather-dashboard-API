import React from "react";
import "../css/WeatherCard.css";

const WeatherCard = ({ data }) => {
  const forecast = data.data.list.slice(0, 5); // Show first 5 forecasts

  return (
    <div className="weather-card">
      <h2>5-Day Forecast: {data.city}</h2>
      <div className="forecast-list">
        {forecast.map((entry, idx) => (
          <div key={idx} className="forecast-item">
            <p className="date">{new Date(entry.dt_txt).toLocaleDateString()}</p>
            <img
              src={`http://openweathermap.org/img/wn/${entry.weather[0].icon}@2x.png`}
              alt={entry.weather[0].description}
            />
            <p className="temp">{Math.round(entry.main.temp)}°C</p>
            <p className="desc">{entry.weather[0].description}</p>
            <div className="details">
              <p>💧 {entry.main.humidity}%</p>
              <p>💨 {Math.round(entry.wind.speed)} km/h</p>
              <p>📈 {entry.main.pressure} hPa</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
