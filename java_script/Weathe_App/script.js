const CityInput = document.body.querySelector('#city');
const searchAct = document.body.querySelector("#search");
const nameSpace = document.body.querySelector(".city-name");
const temperature = document.body.querySelector(".temp");

// Selecting the remaining DOM elements based on your HTML classes
const conditionSpace = document.body.querySelector(".condition");
const humiditySpace = document.body.querySelector(".humidity");
const windSpace = document.body.querySelector(".windspeed");

// 1. Your WeatherAPI key
const apiKey = "a1d017a9139345e6aee125116262706"; 

// 2. Fetch logic inside the click event listener
searchAct.addEventListener("click", async () => {
    let cityValue = CityInput.value.trim();
    
    // Guard clause
    if (!cityValue) {
        alert("Please enter a city name");
        return;
    }

    // 3. Dynamic URL construction
    const URL = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityValue}`;

    try {
        let response = await fetch(URL);
        
        if (!response.ok) {
            throw new Error(`City not found or API issue (Status: ${response.status})`);
        }

        let data = await response.json();
        console.log(data); // Inspect this in your browser console to see the structure!
        
        // 4. Update the UI using the correct API data paths
        nameSpace.textContent = data.location.name;
        temperature.textContent = `Temperature: ${data.current.temp_c}°C`;
        conditionSpace.textContent = `Condition: ${data.current.condition.text}`;
        humiditySpace.textContent = `Humidity: ${data.current.humidity}%`;
        windSpace.textContent = `Wind: ${data.current.wind_kph} km/h`;

    } catch (error) {
        console.error("Error fetching weather:", error.message);
        alert("Could not fetch weather data. Please check the city name.");
    }
});