const spinner = document.getElementById('spinner');
const weatherInfo = document.getElementById('weatherInfo');
let isCelsius = true;

document.getElementById('unitToggle').addEventListener('change', (e) => {
    isCelsius = !e.target.checked;
});

async function getWeather() {
    const city = document.getElementById('city').value.trim();

    weatherInfo.innerHTML = '';

    if (!city) {
        weatherInfo.innerHTML = '<p style="color: red;">Please enter a city name.</p>';
        return;
    }

    const apiKey = 'c2d92c0900c2b6853a6b34d41f8d1670'; // Your API key
    const units = isCelsius ? 'metric' : 'imperial';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    try {
        spinner.style.display = 'flex'; // Show loader
        const response = await fetch(apiUrl);

        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        spinner.style.display = 'none'; // Hide loader

        weatherInfo.innerHTML = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p><strong>🌡 Temperature:</strong> ${data.main.temp} ${isCelsius ? '°C' : '°F'}</p>
            <p><strong>🌤 Weather:</strong> ${data.weather[0].description}</p>
        `;
    } catch (error) {
        spinner.style.display = 'none';
        weatherInfo.innerHTML = '<p style="color: red;">Error: Unable to fetch weather data.</p>';
    }
}
