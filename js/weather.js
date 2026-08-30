function updateWeatherWidget(temp, location, description, icon) {
    document.getElementById('weatherTemp').textContent = `${Math.round(temp)}°`;
    document.getElementById('weatherLoc').textContent = location;
    document.getElementById('weatherDesc').textContent = description;
    document.getElementById('weatherIcon').textContent = icon;
}

function getWeatherEmoji(condition) {
    const conditions = {
        'Clear':'☀️',
        'Clouds':'☁️',
        'Rain':'🌧',
        'Drizzle':'🌦',
        'Thunderstorm':'⛈',
        'Snow':'❄️',
        'Mist':'🌫'
    }
    return conditions[condition] || '🌤';
}

function getWeatherCondition(code) {
    if ([0].includes(code)) return { type: 'Clear', description: 'Clear sky' };
    if ([1, 2, 3].includes(code)) return { type: 'Clouds', description: 'Partly cloudy' };
    if ([45, 48].includes(code)) return { type: 'Mist', description: 'Foggy' };
    if ([51, 53, 55, 56, 57].includes(code)) return { type: 'Drizzle', description: 'Drizzly' };
    if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { type: 'Rain', description: 'Rainy' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { type: 'Snow', description: 'Snowy' };
    if ([95, 96, 99].includes(code)) return { type: 'Thunderstorm', description: 'Thunderstorm' };
    return { type: 'Clouds', description: 'Conditions' };
}

async function fetchWeather() {
    const latitude = 34.0522;
    const longitude = -118.2437;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code&temperature_unit=fahrenheit&timezone=auto`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Weather request failed (${response.status})`);
        }

        const data = await response.json();
        const current = data?.current;

        if (!current || current.temperature_2m === undefined || current.weather_code === undefined) {
            throw new Error('Weather response missing expected data');
        }

        const condition = getWeatherCondition(current.weather_code);

        updateWeatherWidget(
            current.temperature_2m,
            'Los Angeles, CA',
            condition.description,
            getWeatherEmoji(condition.type)
        );
    } catch (error) {
        console.error('argh no weather... im so sad... try again soon...', error);

        document.getElementById('weatherTemp').textContent = '--°';
        document.getElementById('weatherLoc').textContent = 'Weather unavailable';
        document.getElementById('weatherDesc').textContent = 'Try again soon';
        document.getElementById('weatherIcon').textContent = '🌤';
    }
}

fetchWeather();