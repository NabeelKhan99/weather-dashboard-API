import React, { useEffect, useState } from 'react';
import TemperatureChart from '../components/TemperatureChart';
import PrecipitationChart from '../components/PrecipitationChart';
import CompareChart from '../components/CompareChart';

const WeatherDashboard = () => {
  const [cityData, setCityData] = useState([]);
  const [compareCitiesData, setCompareCitiesData] = useState([]);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const primaryCity = "Toronto";
  const compareCities = ["Winnipeg", "Vancouver"];

  const fetchWeatherData = async (city) => {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
    );
    const data = await res.json();

    return data.list.map(item => ({
      date: item.dt_txt,
      temp: item.main.temp,
      precip: item.rain?.['3h'] || 0
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cityWeather = await fetchWeatherData(primaryCity);
        setCityData(cityWeather);

        const compareData = await Promise.all(
          compareCities.map(async (city) => {
            const data = await fetchWeatherData(city);
            return { name: city, data };
          })
        );
        setCompareCitiesData(compareData);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold mb-6">Weather Dashboard</h1>

      <section>
        <h2 className="text-xl font-semibold mb-2">Temperature Chart ({primaryCity})</h2>
        <TemperatureChart data={cityData} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Precipitation Chart ({primaryCity})</h2>
        <PrecipitationChart data={cityData} />
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">Compare Cities</h2>
        <CompareChart citiesData={compareCitiesData} />
      </section>
    </div>
  );
};

export default WeatherDashboard;
