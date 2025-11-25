import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCelsius, setIsCelsius] = useState(false);

  const apiUrl = 'http://localhost:3001/api';

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const response = await fetch(`${apiUrl}/cities`);
      const data = await response.json();
      setCities(data);
      if (data.length > 0) {
        setSelectedCity(data[0]);
        fetchWeather(data[0]);
      }
    } catch (err) {
      setError('Failed to fetch cities');
    }
  };

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${apiUrl}/weather/${cityName.toLowerCase()}`);
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);
    fetchWeather(cityName);
  };

  const convertToC = (fahrenheit) => {
    return Math.round((fahrenheit - 32) * 5 / 9);
  };

  const getDisplayTemperature = () => {
    if (!weatherData) return 0;
    return isCelsius ? convertToC(weatherData.temperature) : weatherData.temperature;
  };

  const toggleUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🌤️ Weather Dashboard</h1>
      </header>

      <div className="container">
        <div className="city-selector">
          <label htmlFor="city-select">Select City:</label>
          <select
            id="city-select"
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
        </div>

        <div className="unit-toggle">
          <button
            className={`unit-button ${!isCelsius ? 'active' : ''}`}
            onClick={toggleUnit}
          >
            °F
          </button>
          <button
            className={`unit-button ${isCelsius ? 'active' : ''}`}
            onClick={toggleUnit}
          >
            °C
          </button>
        </div>

        {loading && <div className="loading">Loading...</div>}

        {error && <div className="error">{error}</div>}

        {weatherData && !loading && (
          <div className="weather-card">
            <div className="weather-icon">{weatherData.icon}</div>
            <h2 className="city-name">{weatherData.city}</h2>
            <div className="temperature">{getDisplayTemperature()}°{isCelsius ? 'C' : 'F'}</div>
            <div className="condition">{weatherData.condition}</div>

            <div className="details">
              <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{weatherData.humidity}%</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Wind Speed</span>
                <span className="detail-value">{weatherData.windSpeed} mph</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
