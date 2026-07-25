// ===========================================
// WEATHER API KEY
// ===========================================

// Replace this with your own WeatherAPI key
const apiKey = "YOUR_API_KEY_HERE";

// Check if the API key has been added
if (apiKey === "YOUR_API_KEY_HERE") {
    alert("Please add your WeatherAPI key in script.js before running the project.");
    throw new Error("WeatherAPI key not configured.");
}

// ===========================================
// DOM ELEMENTS
// ===========================================

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("city");

// ===========================================
// EVENT LISTENERS
// ===========================================

searchBtn.addEventListener("click", getWeather);

cityInput.addEventListener("keypress", function (e) {

    if (e.key === "Enter") {

        getWeather();

    }

});

// ===========================================
// GET WEATHER
// ===========================================

async function getWeather() {

    const city = cityInput.value.trim();

    if (city === "") {

        alert("Please enter a city name.");
        return;

    }

    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=yes`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.error) {

            alert(data.error.message);
            return;

        }

        document.getElementById("weather").style.display = "block";

        document.getElementById("cityName").innerHTML =
            `${data.location.name}, ${data.location.country}`;

        document.getElementById("temp").innerHTML =
            `${data.current.temp_c}°C`;

        document.getElementById("condition").innerHTML =
            data.current.condition.text;

        document.getElementById("humidity").innerHTML =
            `Humidity : ${data.current.humidity}%`;

        document.getElementById("wind").innerHTML =
            `Wind : ${data.current.wind_kph} km/h`;

        document.getElementById("icon").src =
            "https:" + data.current.condition.icon;

        document.getElementById("icon").alt =
            data.current.condition.text;

    }

    catch (error) {

        alert("Unable to fetch weather data. Please try again later.");
        console.error(error);

    }

}