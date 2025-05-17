// API Configuration
const API_KEY = '29dcfccf3fd0c8dfee58955647f149eb';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Default location (New York)
const DEFAULT_LAT = 40.7128;
const DEFAULT_LON = -74.0060;

// DOM Elements
const loadingOverlay = document.getElementById('loadingOverlay');
const loadingText = document.querySelector('.loading-text');
const contentWrapper = document.getElementById('contentWrapper');
const error = document.getElementById('error');
const weatherCard = document.getElementById('weatherCard');
const forecastCard = document.getElementById('forecastCard');
const weeklyForecastCard = document.getElementById('weeklyForecastCard');

// Weather Elements
const locationElement = document.getElementById('location');
const dateTimeElement = document.getElementById('date-time');
const seasonElement = document.getElementById('season');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const feelsLikeElement = document.getElementById('feels-like');
const weatherIconElement = document.getElementById('weather-icon');
const windElement = document.getElementById('wind');
const humidityElement = document.getElementById('humidity');
const rainfallElement = document.getElementById('rainfall');
const pressureElement = document.getElementById('pressure');
const forecastContainer = document.getElementById('forecastContainer');
const weeklyForecastContainer = document.getElementById('weeklyForecastContainer');

// Add new DOM elements
const uvIndexElement = document.getElementById('uv-index');
const dewPointElement = document.getElementById('dew-point');
const airQualityElement = document.getElementById('air-quality');

// Add search functionality
const citySearch = document.getElementById('citySearch');
const searchButton = document.getElementById('searchButton');

// Add autocomplete functionality
const citySuggestions = document.getElementById('citySuggestions');
let debounceTimer;

// Show loading overlay with message
function showLoading(message) {
    loadingText.textContent = message;
    loadingOverlay.classList.add('active');
    contentWrapper.style.display = 'none';
    weatherCard.style.display = 'none';
    forecastCard.style.display = 'none';
    weeklyForecastCard.style.display = 'none';
}

// Hide loading overlay
function hideLoading() {
    loadingOverlay.classList.remove('active');
    contentWrapper.style.display = 'block';
}

// Initialize the application
function init() {
    showLoading('Initializing weather dashboard...');
    requestLocationAccess();
}

// Request location access
function requestLocationAccess() {
    const userChoice = confirm('Would you like to share your location for accurate weather data?');
    
    if (userChoice) {
        if (navigator.geolocation) {
            showLoading('Getting your location...');
            
            navigator.geolocation.getCurrentPosition(
                handleLocationSuccess,
                handleLocationError,
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            showError('Geolocation is not supported by your browser');
            fetchWeatherData(DEFAULT_LAT, DEFAULT_LON);
        }
    } else {
        showLoading('Using default location...');
        fetchWeatherData(DEFAULT_LAT, DEFAULT_LON);
    }
}

// Handle successful location
function handleLocationSuccess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    
    if (isValidCoordinates(latitude, longitude)) {
        console.log('Location coordinates:', { lat: latitude, lon: longitude });
        loadingText.textContent = 'Location found! Fetching weather data...';
        setTimeout(() => {
            fetchWeatherData(latitude, longitude);
        }, 1000);
    } else {
        showError('Invalid location coordinates received');
        fetchWeatherData(DEFAULT_LAT, DEFAULT_LON);
    }
}

// Handle location errors
function handleLocationError(error) {
    let errorMessage = 'Unable to retrieve your location. Using default location.';
    showError(errorMessage);
    loadingText.textContent = 'Using default location...';
    fetchWeatherData(DEFAULT_LAT, DEFAULT_LON);
}

// Helper function to validate coordinates
function isValidCoordinates(lat, lon) {
    return (
        typeof lat === 'number' &&
        typeof lon === 'number' &&
        !isNaN(lat) &&
        !isNaN(lon) &&
        lat >= -90 && lat <= 90 &&
        lon >= -180 && lon <= 180 &&
        lat !== 0 && lon !== 0
    );
}

// Fetch weather data from API
async function fetchWeatherData(latitude, longitude) {
    try {
        loadingText.textContent = 'Fetching current weather...';
        
        // Add retry logic for API calls
        let retries = 3;
        let response;
        
        while (retries > 0) {
            try {
                response = await fetch(
                    `${BASE_URL}/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                );
                if (response.ok) break;
                retries--;
                if (retries > 0) {
                    loadingText.textContent = `Retrying... (${retries} attempts left)`;
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
            } catch (err) {
                retries--;
                if (retries === 0) throw err;
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();

        if (data.cod === 200) {
            console.log('Weather data received for location:', data.name);
            loadingText.textContent = 'Updating weather display...';
            updateWeatherUI(data);
            await fetchForecast(latitude, longitude);
            hideLoading();
        } else {
            throw new Error(data.message || 'Failed to fetch weather data');
        }
    } catch (err) {
        console.error('Error fetching weather data:', err);
        loadingText.textContent = `Error: ${err.message}`;
        setTimeout(() => {
            hideLoading();
        }, 3000);
    }
}

// Fetch forecast data
async function fetchForecast(latitude, longitude) {
    try {
        const response = await fetch(
            `${BASE_URL}/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json();

        if (data.cod === '200') {
            updateForecastUI(data);
        }
    } catch (err) {
        console.error('Error fetching forecast:', err);
    }
}

// Update weather UI with current weather data
function updateWeatherUI(data) {
    const date = new Date();
    const season = getSeason(date);
    
    locationElement.textContent = `${data.name}, ${data.sys.country}`;
    dateTimeElement.textContent = date.toLocaleString();
    seasonElement.textContent = season;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    descriptionElement.textContent = data.weather[0].description;
    feelsLikeElement.textContent = `${Math.round(data.main.feels_like)}°C`;
    weatherIconElement.className = getWeatherIcon(data.weather[0].id);
    windElement.textContent = `${Math.round(data.wind.speed * 3.6)} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
    rainfallElement.textContent = data.rain ? `${data.rain['1h']}%` : '0%';
    pressureElement.textContent = `${data.main.pressure} hPa`;

    // Calculate and display dew point
    const dewPoint = calculateDewPoint(data.main.temp, data.main.humidity);
    dewPointElement.textContent = `${Math.round(dewPoint)}°C`;

    // Fetch and display UV index
    fetchUVIndex(data.coord.lat, data.coord.lon);

    // Fetch and display air quality
    fetchAirQuality(data.coord.lat, data.coord.lon);

    weatherCard.style.display = 'block';
}

// Calculate dew point
function calculateDewPoint(temp, humidity) {
    const a = 17.27;
    const b = 237.7;
    const alpha = ((a * temp) / (b + temp)) + Math.log(humidity / 100);
    return (b * alpha) / (a - alpha);
}

// Fetch UV index data
async function fetchUVIndex(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.value) {
            uvIndexElement.textContent = `${Math.round(data.value)}`;
            updateUVIndexColor(data.value);
        }
    } catch (err) {
        console.error('Error fetching UV index:', err);
    }
}

// Update UV index color based on value
function updateUVIndexColor(value) {
    const uvIndexElement = document.getElementById('uv-index');
    uvIndexElement.className = 'uv-index';
    
    if (value <= 2) uvIndexElement.classList.add('low');
    else if (value <= 5) uvIndexElement.classList.add('moderate');
    else if (value <= 7) uvIndexElement.classList.add('high');
    else if (value <= 10) uvIndexElement.classList.add('very-high');
    else uvIndexElement.classList.add('extreme');
}

// Fetch air quality data
async function fetchAirQuality(lat, lon) {
    try {
        const response = await fetch(
            `${BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.list && data.list[0]) {
            const aqi = data.list[0].main.aqi;
            airQualityElement.textContent = getAQIDescription(aqi);
            updateAQIColor(aqi);
        }
    } catch (err) {
        console.error('Error fetching air quality:', err);
    }
}

// Get AQI description
function getAQIDescription(aqi) {
    const descriptions = {
        1: 'Good',
        2: 'Fair',
        3: 'Moderate',
        4: 'Poor',
        5: 'Very Poor'
    };
    return descriptions[aqi] || 'Unknown';
}

// Update AQI color based on value
function updateAQIColor(aqi) {
    const airQualityElement = document.getElementById('air-quality');
    airQualityElement.className = 'air-quality';
    
    const colors = {
        1: 'good',
        2: 'fair',
        3: 'moderate',
        4: 'poor',
        5: 'very-poor'
    };
    
    airQualityElement.classList.add(colors[aqi] || 'unknown');
}

// Update forecast UI
function updateForecastUI(data) {
    // Group forecast data by day
    const dailyForecasts = {};
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString();
        
        if (!dailyForecasts[day]) {
            dailyForecasts[day] = {
                temps: [],
                descriptions: [],
                icons: [],
                wind: [],
                humidity: []
            };
        }
        
        dailyForecasts[day].temps.push(item.main.temp);
        dailyForecasts[day].descriptions.push(item.weather[0].description);
        dailyForecasts[day].icons.push(item.weather[0].id);
        dailyForecasts[day].wind.push(item.wind.speed);
        dailyForecasts[day].humidity.push(item.main.humidity);
    });

    // Clear existing forecast items
    forecastContainer.innerHTML = '';

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sort dates and get next 4 days
    const sortedDates = Object.keys(dailyForecasts)
        .map(date => new Date(date))
        .filter(date => date > today)
        .sort((a, b) => a - b)
        .slice(0, 4);

    // Create forecast items for next 4 days
    sortedDates.forEach(date => {
        const day = date.toLocaleDateString();
        const forecast = dailyForecasts[day];
        
        const avgTemp = Math.round(forecast.temps.reduce((a, b) => a + b) / forecast.temps.length);
        const mostFrequentDesc = getMostFrequent(forecast.descriptions);
        const mostFrequentIcon = getMostFrequent(forecast.icons);
        const avgWind = Math.round(forecast.wind.reduce((a, b) => a + b) / forecast.wind.length * 3.6); // Convert to km/h
        const avgHumidity = Math.round(forecast.humidity.reduce((a, b) => a + b) / forecast.humidity.length);

        const forecastItem = document.createElement('div');
        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="forecast-date">
                <div class="day">${date.toLocaleDateString('en-US', { weekday: 'short' })}</div>
                <div class="date">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            </div>
            <div class="forecast-temp">
                <div class="temp">${avgTemp}°C</div>
                <div class="feels-like">Feels like: ${Math.round(forecast.temps[12] || avgTemp)}°C</div>
            </div>
            <div class="forecast-icon">
                <i class="${getWeatherIcon(mostFrequentIcon)}"></i>
            </div>
            <div class="forecast-details">
                <div class="forecast-desc">${mostFrequentDesc}</div>
                <div class="forecast-wind"><i class="fas fa-wind"></i> ${avgWind} km/h</div>
                <div class="forecast-humidity"><i class="fas fa-tint"></i> ${avgHumidity}%</div>
            </div>
        `;
        forecastContainer.appendChild(forecastItem);
    });

    forecastCard.style.display = 'block';
}

// Helper function to get most frequent value in an array
function getMostFrequent(arr) {
    const frequency = {};
    let maxFreq = 0;
    let mostFrequent;

    arr.forEach(item => {
        frequency[item] = (frequency[item] || 0) + 1;
        if (frequency[item] > maxFreq) {
            maxFreq = frequency[item];
            mostFrequent = item;
        }
    });

    return mostFrequent;
}

// Get weather icon based on weather code
function getWeatherIcon(code) {
    if (code >= 200 && code < 300) return 'fas fa-bolt';
    if (code >= 300 && code < 400) return 'fas fa-cloud-rain';
    if (code >= 500 && code < 600) return 'fas fa-rain';
    if (code >= 600 && code < 700) return 'fas fa-snowflake';
    if (code >= 700 && code < 800) return 'fas fa-smog';
    if (code === 800) return 'fas fa-sun';
    if (code > 800) return 'fas fa-cloud';
    return 'fas fa-cloud';
}

// Get current season
function getSeason(date) {
    const month = date.getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
}

// Show error message
function showError(message) {
    error.textContent = message;
    error.style.display = 'block';
    error.style.color = '#ff4444';
    error.style.padding = '10px';
    error.style.margin = '10px 0';
    error.style.borderRadius = '5px';
    error.style.backgroundColor = 'rgba(255, 68, 68, 0.1)';
    
    // Hide error after 5 seconds
    setTimeout(() => {
        error.style.display = 'none';
    }, 5000);
}

// Add event listeners for search
searchButton.addEventListener('click', handleSearch);
citySearch.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Add input event listener for autocomplete
citySearch.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    
    if (query.length < 2) {
        citySuggestions.classList.remove('active');
        return;
    }

    debounceTimer = setTimeout(() => {
        fetchCitySuggestions(query);
    }, 300);
});

// Close suggestions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-wrapper')) {
        citySuggestions.classList.remove('active');
    }
});

// Fetch city suggestions
async function fetchCitySuggestions(query) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`
        );
        const cities = await response.json();

        if (cities && cities.length > 0) {
            displayCitySuggestions(cities);
        } else {
            citySuggestions.classList.remove('active');
        }
    } catch (err) {
        console.error('Error fetching city suggestions:', err);
        citySuggestions.classList.remove('active');
    }
}

// Display city suggestions
function displayCitySuggestions(cities) {
    citySuggestions.innerHTML = '';
    
    cities.forEach(city => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
            <span class="city-name">${city.name}</span>
            <span class="country-name">${city.country}</span>
        `;
        
        div.addEventListener('click', () => {
            citySearch.value = city.name;
            citySuggestions.classList.remove('active');
            handleSearch();
        });
        
        citySuggestions.appendChild(div);
    });
    
    citySuggestions.classList.add('active');
}

// Update handleSearch function
async function handleSearch() {
    const city = citySearch.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    try {
        showLoading('Searching for city...');
        error.style.display = 'none';
        weatherCard.style.display = 'none';
        forecastCard.style.display = 'none';
        weeklyForecastCard.style.display = 'none';
        citySuggestions.classList.remove('active');

        // First, get coordinates for the city
        const geoResponse = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
        );
        const geoData = await geoResponse.json();

        if (!geoData || geoData.length === 0) {
            throw new Error('City not found');
        }

        const { lat, lon } = geoData[0];
        
        // Fetch weather data using coordinates
        await fetchWeatherData(lat, lon);
        
        // Clear search input
        citySearch.value = '';
        
    } catch (err) {
        console.error('Error searching for city:', err);
        showError(err.message || 'Error searching for city');
    } finally {
        hideLoading();
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', init);
