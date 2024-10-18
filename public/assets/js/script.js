document.getElementById('search').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    // Fetch current weather
    const currentWeatherResponse = await fetch(`/weather?city=${city}`);
    const currentWeatherData = await currentWeatherResponse.json();

    // Fetch 5-day forecast
    const forecastResponse = await fetch(`/forecast?city=${city}`);
    const forecastData = await forecastResponse.json();

    // Update current weather
    if (currentWeatherData.cod === 200) {
        document.getElementById('current-weather-box').innerHTML = `
            <h2>${currentWeatherData.name}</h2>
            <p>Temperature: ${currentWeatherData.main.temp} °C</p>
            <p>Weather: ${currentWeatherData.weather[0].description}</p>
            <p>Humidity: ${currentWeatherData.main.humidity}%</p>
        `;
    } else {
        document.getElementById('current-weather-box').innerHTML = `<p>${currentWeatherData.message}</p>`;
    }

    // Update forecast boxes
    if (forecastData.cod === "200") {
        for (let i = 0; i < 5; i++) {
            const dayForecast = forecastData.list[i * 8]; // Data is provided in 3-hour intervals, hence every 8th item represents a new day
            const forecastBox = document.getElementById(`day${i + 1}`);
            forecastBox.innerHTML = `
                <h4>${new Date(dayForecast.dt_txt).toLocaleDateString()}</h4>
                <p>Temp: ${dayForecast.main.temp} °C</p>
                <p>Weather: ${dayForecast.weather[0].description}</p>
                <p>Humidity: ${dayForecast.main.humidity}%</p>
            `;
        }
    } else {
        for (let i = 0; i < 5; i++) {
            document.getElementById(`day${i + 1}`).innerHTML = `<p>Error fetching forecast</p>`;
        }
    }
});
