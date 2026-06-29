const CityInput = document.body.querySelector('#city');
const searchAct = document.body.querySelector("#search");
const nameSpace = document.body.querySelector(".city-name");
const temperature = document.body.querySelector(".temp");
const conditionSpace = document.body.querySelector(".condition");
const humiditySpace = document.body.querySelector(".humidity");
const windSpace = document.body.querySelector(".windspeed");

const apiKey = "a1d017a9139345e6aee125116262706"; 

// 1. Helper function to update the DOM elements
function updateUI(data) {
    nameSpace.textContent = data.location.name;
    temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
    conditionSpace.textContent = `Condition: ${data.current.condition.text}`;
    humiditySpace.textContent = `Humidity: ${data.current.humidity}%`;
    windSpace.textContent = `Wind: ${data.current.wind_kph} km/h`;
}

// 2. Main search function logic
async function handleSearch() {
    let cityValue = CityInput.value.trim();
    
    if (!cityValue) {
        alert("Please enter a city name");
        return;
    }

    const URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityValue}`;

    try {
        let response = await fetch(URL);
        
        if (!response.ok) {
            throw new Error(`City not found or API issue (Status: ${response.status})`);
        }

        let data = await response.json();
        
        updateUI(data);
        localStorage.setItem("lastWeatherData", JSON.stringify(data));

    } catch (error) {
        console.error("Error fetching weather:", error.message);
        alert("Could not fetch weather data. Please check the city name.");
    }
}

// 3. Trigger search on click
searchAct.addEventListener("click", handleSearch);

// 4. NEW FEATURE: Trigger search when pressing "Enter" inside the input field
CityInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        handleSearch();
    }
});

// 5. Load cached data from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
    const savedWeatherData = localStorage.getItem("lastWeatherData");
    if (savedWeatherData) {
        const cachedData = JSON.parse(savedWeatherData);
        updateUI(cachedData);
    }
});