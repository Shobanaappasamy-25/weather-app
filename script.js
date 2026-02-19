const API_KEY = '23bde857bbd090d8098f3a3c1eb90cdf';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

async function getWeather() {
    const city = document.getElementById('cityInput').value.trim();
    if (!city) return alert('City name enter pannunga!');
    
    try {
        document.getElementById('weatherInfo').classList.add('hidden');
        document.getElementById('errorMsg').classList.add('hidden');
        
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await response.json();
        
        if (data.cod !== 200) throw new Error('City not found!');
        
        document.getElementById('cityName').textContent = data.name;
        document.getElementById('temperature').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('weatherDesc').textContent = data.weather[0].description;
        document.getElementById('humidity').textContent = `${data.main.humidity}%`;
        document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
        document.getElementById('weatherIcon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        
        document.getElementById('weatherInfo').classList.remove('hidden');
        
    } catch (error) {
        document.getElementById('errorMsg').textContent = error.message;
        document.getElementById('errorMsg').classList.remove('hidden');
    }
}

// Enter key support
document.getElementById('cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getWeather();
});

// DARK MODE TOGGLE
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.checked = localStorage.getItem('darkMode') === 'true';
document.body.classList.toggle('dark', darkModeToggle.checked);

darkModeToggle.addEventListener('change', function() {
    document.body.classList.toggle('dark', this.checked);
    localStorage.setItem('darkMode', this.checked);
});

// Page load-la auto London search
window.onload = () => getWeather();

