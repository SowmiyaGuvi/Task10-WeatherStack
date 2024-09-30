document.addEventListener('DOMContentLoaded', () => {
    // Add Event Listener for Fetch Weather Button
    document.getElementById('fetch-weather').addEventListener('click', () => {
        const location = document.getElementById('location-input').value;
        if (location) {
            fetchWeather(location);
        } else {
            displayError('Please enter a location.');
        }
    });
});

// Fetch Weather Data using Weatherstack API
function fetchWeather(location) {
    const apiKey = '63950b318d7e57c7a355ae6b41e60571'; // Replace with your Weatherstack API key
    const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${location}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.success === false) {
                throw new Error(data.error.info);
            }
            displayWeather(data);
        })
        .catch(error => {
            displayError(`Error fetching weather data: ${error.message}`);
        });
}

// Display Weather Information in the DOM
function displayWeather(data) {
    const weatherResult = document.getElementById('weather-result');
    const weather = data.current;
    const location = data.location;

    weatherResult.innerHTML = `
        <h3>Weather in ${location.name}, ${location.country}</h3>
        <p>Temperature: ${weather.temperature} °C</p>
        <p>Weather Description: ${weather.weather_descriptions[0]}</p>
        <img src="${weather.weather_icons[0]}" alt="Weather Icon">
        <p>Humidity: ${weather.humidity}%</p>
        <p>Wind Speed: ${weather.wind_speed} km/h</p>
    `;
}

// Display Error in the DOM
function displayError(message) {
    const weatherResult = document.getElementById('weather-result');
    weatherResult.innerHTML = `<p class="text-danger">${message}</p>`;
}