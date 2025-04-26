import React, { useState } from "react";
import axios from "axios";
import "./css/styles.css";
import WeatherCard from "./components/WeatherCard";
import Chart from "./components/Chart";

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

function App() {
  const [search, setSearch] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [pinnedCities, setPinnedCities] = useState([]);
  const [comparisonData, setComparisonData] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData({ city, data: res.data });
    } catch (err) {
      alert("City not found!");
    } finally {
      setLoading(false);
    }
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) {
      fetchWeather(search.trim());
      setSearch("");
    }
  };

  const handlePinCity = (cityWeather) => {
    if (pinnedCities.length < 3) {
      setPinnedCities([...pinnedCities, cityWeather.city]);
      setComparisonData([...comparisonData, cityWeather]);
    } else {
      // Replace the first city if we already have 3 pinned cities
      const updatedCities = [...pinnedCities.slice(1), cityWeather.city];
      const updatedData = [
        ...comparisonData.slice(1),
        { city: cityWeather.city, data: cityWeather.data },
      ];
      setPinnedCities(updatedCities);
      setComparisonData(updatedData);
    }
  };

  const removePinnedCity = (city) => {
    setPinnedCities(pinnedCities.filter((c) => c !== city));
    setComparisonData(comparisonData.filter((d) => d.city !== city));
  };

  const autoPinCity = () => {
    if (weatherData && !pinnedCities.includes(weatherData.city)) {
      handlePinCity(weatherData);
    }
  };

  // Auto-pin after the data is fetched
  React.useEffect(() => {
    if (weatherData) {
      autoPinCity();
    }
  }, [weatherData]);

  return (
    <div className={`weather-dashboard ${darkMode ? "dark" : "light"}`}>
      <header className="dashboard-header">
        <h1>🌦️ Weather Dashboard</h1>
        <button className="toggle-mode" onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          placeholder="Enter city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="pinned-cities-container">
        {comparisonData.map((item) => (
          <div
            key={item.city}
            className={`pinned-city-tile ${
              weatherData?.city === item.city ? "active" : ""
            }`}
            onClick={() => setWeatherData(item)}
          >
            <h3>{item.city}</h3>
            <button
              className="remove"
              onClick={(e) => {
                e.stopPropagation();
                removePinnedCity(item.city);
              }}
            >
              ❌
            </button>
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      {/* Display weather cards for pinned cities */}
      <div className="weather-cards-container">
        {comparisonData.map((cityData) => (
          <WeatherCard key={cityData.city} data={cityData} />
        ))}
      </div>

      {comparisonData.length > 0 && (
        <div className="chart-container">
          <h2>📊 Forecast Comparison</h2>
          <Chart data={comparisonData} />
        </div>
      )}
    </div>
  );
}

export default App;
