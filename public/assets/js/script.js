// Function to update the weather data with a smooth transition
const updateWeatherData = (element, content) => {
    element.style.opacity = 0; // Fade out effect
    setTimeout(() => {
        element.innerHTML = content;
        element.style.opacity = 1; // Fade in effect
    }, 300); // Wait for 300ms before updating content
};

// Function to fetch and display the weather information
const displayWeather = async () => {
    const city = document.getElementById('city').value.trim();
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    try {
        // Fetch current weather
        const currentWeatherResponse = await fetch(`/weather?city=${city}`);
        const currentWeatherData = await currentWeatherResponse.json();

        // Fetch 5-day forecast
        const forecastResponse = await fetch(`/forecast?city=${city}`);
        const forecastData = await forecastResponse.json();

        // Update current weather box
        if (currentWeatherData.cod === 200) {
            const currentWeatherContent = `
                <h2>${currentWeatherData.name}</h2>
                <p>Temperature: ${currentWeatherData.main.temp} °C</p>
                <p>Weather: ${currentWeatherData.weather[0].description}</p>
                <p>Humidity: ${currentWeatherData.main.humidity}%</p>
            `;
            updateWeatherData(document.getElementById('current-weather-box'), currentWeatherContent);
        } else {
            updateWeatherData(document.getElementById('current-weather-box'), `<p>${currentWeatherData.message}</p>`);
        }

        // Update forecast boxes
        if (forecastData.cod === "200") {
            for (let i = 0; i < 5; i++) {
                const dayForecast = forecastData.list[i * 8]; // Data is in 3-hour intervals, every 8th item is a new day
                const forecastBox = document.getElementById(`day${i + 1}`);
                const forecastContent = `
                    <h4>${new Date(dayForecast.dt_txt).toLocaleDateString()}</h4>
                    <p>Temp: ${dayForecast.main.temp} °C</p>
                    <p>Weather: ${dayForecast.weather[0].description}</p>
                    <p>Humidity: ${dayForecast.main.humidity}%</p>
                `;
                updateWeatherData(forecastBox, forecastContent);
            }
        } else {
            for (let i = 0; i < 5; i++) {
                updateWeatherData(document.getElementById(`day${i + 1}`), `<p>Error fetching forecast</p>`);
            }
        }

    } catch (error) {
        alert('Error fetching weather data. Please try again later.');
        console.error('Error:', error);
    }


    // Toggle the navigation menu on mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

};

// Event listener for the search button
document.getElementById('search').addEventListener('click', displayWeather);
