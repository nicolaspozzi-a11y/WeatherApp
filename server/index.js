const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Mock weather data for different cities
const weatherData = {
  'new york': {
    city: 'New York',
    temperature: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    icon: '⛅'
  },
  'london': {
    city: 'London',
    temperature: 59,
    condition: 'Rainy',
    humidity: 80,
    windSpeed: 15,
    icon: '🌧️'
  },
  'tokyo': {
    city: 'Tokyo',
    temperature: 68,
    condition: 'Sunny',
    humidity: 55,
    windSpeed: 8,
    icon: '☀️'
  },
  'paris': {
    city: 'Paris',
    temperature: 64,
    condition: 'Cloudy',
    humidity: 70,
    windSpeed: 10,
    icon: '☁️'
  },
  'sydney': {
    city: 'Sydney',
    temperature: 75,
    condition: 'Sunny',
    humidity: 60,
    windSpeed: 14,
    icon: '☀️'
  }
};

// Get weather by city
app.get('/api/weather/:city', (req, res) => {
  const cityName = req.params.city.toLowerCase();
  const weather = weatherData[cityName];

  if (weather) {
    res.json(weather);
  } else {
    res.status(404).json({ error: 'City not found' });
  }
});

// Get all cities
app.get('/api/cities', (req, res) => {
  const cities = Object.values(weatherData).map(data => data.city);
  res.json(cities);
});

app.listen(PORT, () => {
  console.log(`Weather API server running on http://localhost:${PORT}`);
});
