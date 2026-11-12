# Experiment 13 - React Weather Service with Chart.js

## Objective
Create a service in React that fetches weather information from OpenWeatherMap (and public meteorological endpoints) and graphically displays current and historical/hourly weather metrics using **Chart.js**.

---

## Features Implemented
1. **Weather Service Layer (`weatherService.js`)**: Encapsulates asynchronous API calls, error resilience, and data transformation.
2. **Current Metrics**: Real-time display of Temperature (°C), Feels Like, Relative Humidity (%), and Wind Speed (km/h).
3. **Chart.js Data Visualization**:
   - Hourly trend line and bar charts.
   - Interactive toggle between **Temperature** and **Relative Humidity**.
   - Interactive toggle between **Line Chart** and **Bar Chart**.
4. **Multi-City Support**: Seamlessly switch between cities (Hyderabad, Bangalore, London, New York, Tokyo, Sydney).

---

## How to Run in VS Code

### 1. Run with Node.js Server
```bash
cd "Experiment 13 - React Weather App with ChartJS"
node server.js
```
Open your browser at:
```
http://localhost:3013
```

### 2. Live Server / Browser
- Open `index.html` with VS Code Live Server or double click to view in your favorite web browser.
