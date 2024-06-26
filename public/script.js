document.getElementById('getWeatherBtn').addEventListener('click', function() {
    const city = document.getElementById('cityInput').value.toLowerCase();

    if (city === '') {
        alert('Please enter a city name');
        return;
    }

 
    const cachedWeather = localStorage.getItem(city);
    const currentTime = new Date().getTime();

    if (cachedWeather) {
        const weatherData = JSON.parse(cachedWeather);
        if (currentTime - weatherData.timestamp < 3600000) { 
            displayWeather(weatherData.data);
            return;
        }
    }

    fetch(`/weather?city=${city}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = { data, timestamp: currentTime };
            localStorage.setItem(city, JSON.stringify(weatherInfo));
            displayWeather(data);
        })
        .catch(error => {
            document.getElementById('weatherInfo').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

function displayWeather(weatherInfo) {
    const weatherInfoElement = document.getElementById('weatherInfo');
    const { locationName, currentWeatherData, forecastData } = weatherInfo;

    const iconCode = String(currentWeatherData[0].WeatherIcon).padStart(2, '0');
    const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconCode}-s.png`;

    weatherInfoElement.innerHTML = `
        <h2>${locationName}</h2>
        <p>Temperature: ${currentWeatherData[0].Temperature.Metric.Value}°C</p>
        <p>Weather: ${currentWeatherData[0].WeatherText}</p>
        <img src="${iconUrl}" alt="Weather icon">
    `;

    const forecastContainer = document.createElement('div');
    forecastContainer.className = 'forecast-container';

    const forecastTitle = document.createElement('h3');
    forecastTitle.textContent = '5-Day Forecast';
    weatherInfoElement.appendChild(forecastTitle);

    forecastData.DailyForecasts.forEach(day => {
        const date = new Date(day.Date).toLocaleDateString();
        const iconCode = String(day.Day.Icon).padStart(2, '0');
        const iconUrl = `https://developer.accuweather.com/sites/default/files/${iconCode}-s.png`;
        const dayTemp = day.Temperature.Maximum.Value;
        const nightTemp = day.Temperature.Minimum.Value;
        const weatherText = day.Day.IconPhrase;

        const forecastDay = document.createElement('div');
        forecastDay.className = 'forecast-day';
        forecastDay.innerHTML = `
            <p>${date}</p>
            <img src="${iconUrl}" alt="Weather icon">
            <p>Day: ${dayTemp}°C</p>
            <p>Night: ${nightTemp}°C</p>
            <p>${weatherText}</p>
        `;

        forecastContainer.appendChild(forecastDay);
    });

    weatherInfoElement.appendChild(forecastContainer);
}
