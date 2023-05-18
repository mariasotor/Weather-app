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
  let apiKey = "6bec232055e3f161982b528c34084fba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function defineCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function showWeather(response) {
  let city = response.data.name; //can change to document.querySelector("#searched-city").innerhtml=response.data.name;
  celsiusTemp = response.data.main.temp;
  let windSpeed = response.data.wind.speed;
  windSpeed = Math.round(windSpeed * 3.6);
  let humidity = response.data.main.humidity;
  let weatherDescription = response.data.weather[0].description;
  let icon = response.data.weather[0].icon;

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
    `https://openweathermap.org/img/wn/${icon}@2x.png`
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

  let apiKey = "6bec232055e3f161982b528c34084fba";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
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

searchCity("New York");
