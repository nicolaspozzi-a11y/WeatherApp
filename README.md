# Weather Dashboard App

A minimal weather dashboard built with React (Vite) and Node.js backend API.

## Features

- Clean, modern dashboard UI with gradient background
- Select from multiple cities (New York, London, Tokyo, Paris, Sydney)
- Display current weather conditions including:
  - Temperature
  - Weather condition with icon
  - Humidity percentage
  - Wind speed
- Responsive design for mobile and desktop

## Project Structure

```
WeatherApp/
├── client/          # React frontend (Vite)
│   ├── src/
│   │   ├── App.jsx
│   │   └── App.css
│   └── package.json
├── server/          # Node.js backend API
│   ├── index.js
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup Instructions

### 1. Start the Backend Server

```bash
cd server
npm install
npm start
```

The API server will run on `http://localhost:3001`

### 2. Start the Frontend (in a new terminal)

```bash
cd client
npm install
npm run dev
```

The React app will run on `http://localhost:5173`

## API Endpoints

- `GET /api/cities` - Get list of available cities
- `GET /api/weather/:city` - Get weather data for a specific city

## Usage

1. Open your browser to `http://localhost:5173`
2. Use the dropdown to select a city
3. View the weather information for the selected city

## Technologies Used

### Frontend
- React 18
- Vite
- CSS3 (with animations)

### Backend
- Node.js
- Express
- CORS

## Notes

This is a minimal implementation using mock data. In a production environment, you would integrate with a real weather API like OpenWeatherMap or WeatherAPI.
