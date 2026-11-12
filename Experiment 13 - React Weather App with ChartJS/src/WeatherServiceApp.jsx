import React, { useState } from "react";
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Legend
);

export default function WeatherServiceApp() {
    const [city, setCity] = useState("Hyderabad");
    const [apiKey, setApiKey] = useState("");
    const [message, setMessage] = useState("Sample weather data is shown until an API key is entered.");
    const [weather, setWeather] = useState({
        currentTemp: 29.5,
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        temperatures: [28.0, 29.2, 30.5, 29.0, 29.5]
    });

    const fetchWeather = async event => {
        event.preventDefault();
        if (!apiKey.trim()) {
            setMessage("Enter an OpenWeatherMap API key to retrieve live forecast data.");
            return;
        }
        try {
            setMessage("Loading weather information...");
            const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${encodeURIComponent(apiKey)}`;
            const response = await fetch(url);
            if (!response.ok) throw new Error("Unable to retrieve weather. Check city and API key.");
            const data = await response.json();
            const entries = data.list.slice(0, 5);
            const temperatures = entries.map(entry => entry.main.temp);
            setWeather({
                currentTemp: temperatures[0],
                labels: entries.map(entry => entry.dt_txt),
                temperatures
            });
            setMessage(`Weather information loaded for ${data.city.name}.`);
        } catch (error) {
            setMessage(error.message);
        }
    };

    const chartData = {
        labels: weather.labels,
        datasets: [{
            label: `${city} Temperature (°C)`,
            data: weather.temperatures,
            borderColor: "#16a34a",
            backgroundColor: "rgba(22,163,74,0.15)",
            fill: true,
            tension: 0.3
        }]
    };

    const options = {
        responsive: true,
        plugins: { title: { display: true, text: "Weather Temperature Trend" } },
        scales: { y: { title: { display: true, text: "Temperature (°C)" } } }
    };

    return (
        <main style={{ maxWidth: 760, margin: "35px auto", padding: 18, fontFamily: "Arial" }}>
            <h1>Weather Service</h1>
            <form onSubmit={fetchWeather}>
                <label>City
                    <input value={city} onChange={event => setCity(event.target.value)}
                        required style={{ display: "block", padding: 9, width: "100%" }} />
                </label>
                <label>OpenWeatherMap API Key
                    <input value={apiKey} onChange={event => setApiKey(event.target.value)}
                        type="password" style={{ display: "block", padding: 9, width: "100%" }} />
                </label>
                <button type="submit" style={{ margin: "12px 0", padding: 10 }}>Get Weather</button>
            </form>
            <p role="status">{message}</p>
            <h2>Current Temperature in {city}: {weather.currentTemp.toFixed(1)} °C</h2>
            <Line data={chartData} options={options} />
        </main>
    );
}
