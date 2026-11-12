const statusBox = document.getElementById("status");
let chart;

// 1. ARROW FUNCTION: formats temperature to 1 decimal place
const formatTemperature = value => Number(value).toFixed(1);

// 2. CALLBACK FUNCTION: validates city name and passes to callback
const validateCity = (city, callback) => {
    const cleaned = city.trim();
    if (cleaned.length < 2) {
        callback("Please enter a valid city name.", null);
    } else {
        callback(null, cleaned);
    }
};

// 3. PROMISE: creates an asynchronous delay
const wait = milliseconds => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

// 4. ASYNC / AWAIT: fetches weather data asynchronously
const getWeather = async (city, apiKey) => {
    // If no API key provided, demonstrate Promise with sample data
    if (!apiKey) {
        await wait(200);
        return {
            labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"],
            temperatures: [28.5, 30.1, 29.4, 27.8, 31.0],
            source: "Sample weather data"
        };
    }

    // Live API call using async/await and fetch
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&units=metric&appid=${encodeURIComponent(apiKey)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Weather request failed. Check city name and API key.");
    }
    const data = await response.json();
    const forecast = data.list.slice(0, 5);

    return {
        labels: forecast.map(item => item.dt_txt.split(" ")[0]),
        temperatures: forecast.map(item => item.main.temp),
        source: "OpenWeatherMap Live Data"
    };
};

// 5. FUNCTION TO DRAW GRAPH USING CHART.JS
const drawChart = (city, result) => {
    if (chart) chart.destroy();

    const ctx = document.getElementById("weatherChart").getContext("2d");
    chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: result.labels,
            datasets: [{
                label: `${city} Temperature (°C)`,
                data: result.temperatures,
                borderColor: "#2563eb",
                backgroundColor: "rgba(37, 99, 235, 0.15)",
                fill: true,
                tension: 0.35
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: "Temperature Forecast" }
            },
            scales: {
                y: { title: { display: true, text: "Temperature (°C)" } }
            }
        }
    });
};

// 6. EVENT LISTENER: Triggered when "Load Weather" is clicked
document.getElementById("load").addEventListener("click", () => {
    const cityName = document.getElementById("city").value;
    const apiKey = document.getElementById("apiKey").value.trim();

    // Using Callback
    validateCity(cityName, async (error, city) => {
        if (error) {
            statusBox.textContent = error;
            return;
        }

        statusBox.textContent = "Executing ES6 sequence: Callback -> Promise -> Async/Await...";

        try {
            // Using Async/Await
            const result = await getWeather(city, apiKey);
            statusBox.textContent = `${result.source}\nCity: ${city}\nTemperatures: ${result.temperatures.map(formatTemperature).join(", ")} °C`;
            drawChart(city, result);
        } catch (err) {
            statusBox.textContent = err.message;
        }
    });
});

// Auto-run on page load so graph appears immediately
document.getElementById("load").click();
