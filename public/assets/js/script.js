document.getElementById('search').addEventListener('click', async () => {
    const city = document.getElementById('city').value;
    const response = await fetch(`/weather?city=${city}`);
    const data = await response.json();

    if (data.cod === 200) {
        const weatherResult = `
            <h2>${data.name}</h2>
            <p>Temperature: ${data.main.temp} °C</p>
            <p>Weather: ${data.weather[0].description}</p>
        `;
        document.getElementById('weather-result').innerHTML = weatherResult;
    } else {
        document.getElementById('weather-result').innerHTML = `<p>${data.message}</p>`;
    }
});
