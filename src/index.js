function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  let timeHour = date.getHours();
  if (timeHour < 10) {
    timeHour = `0${timeHour}`;
  }

  let timeMinutes = date.getMinutes();
  if (timeMinutes < 10) {
    timeMinutes = `0${timeMinutes}`;
  }

  let time = `${timeHour}:${timeMinutes}`;

  return `${day} ${time}`;
}

//Display the name of the city on the result page and the current temperature of the city

function searchCity(city) {
  let apiKey = "236fbfee150ba34o7beftdbb466306c4";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function defineCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showWeather(response) {
  let city = response.data.city; //can change to document.querySelector("#searched-city").innerhtml=response.data.name;
  celsiusTemp = response.data.temperature.current;
  let windSpeed = response.data.wind.speed;
  windSpeed = Math.round(windSpeed * 3.6);
  let humidity = response.data.temperature.humidity;
  let weatherDescription = response.data.condition.description;
  let icon = response.data.condition.icon;

  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = `${city}`;
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `${windSpeed}`;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;
  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;
  let iconElement = document.querySelector("#main-icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${icon}.png`
  );
  iconElement.setAttribute("alt", `${weatherDescription}`);
  //Day and time
  let currentDate = new Date();
  let dateElement = document.querySelector("#day-time");
  dateElement.innerHTML = formatDate(currentDate);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", defineCity);

//Current Location button to display weather on current location

function showLocationWeather() {
  navigator.geolocation.getCurrentPosition(defineLocation);
}
function defineLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;

  let apiKey = "236fbfee150ba34o7beftdbb466306c4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

let currentButton = document.querySelector("#current-location-button");
currentButton.addEventListener("click", showLocationWeather);

// Faranheit - celsius conversion

function showFahrenheitTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelciusTemp(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelciusTemp);

searchCity("Cali");

//forecast
