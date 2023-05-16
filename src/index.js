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

  let temp = response.data.main.temp;
  temp = Math.round(temp);

  let windSpeed = response.data.wind.speed;
  windSpeed = Math.round(windSpeed * 3.6);

  let humidity = response.data.main.humidity;

  let weatherDescription = response.data.weather[0].description;

  let cityElement = document.querySelector("#searched-city");
  cityElement.innerHTML = `${city}`;

  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = `${temp}°C`;

  let windSpeedElement = document.querySelector("#wind");
  windSpeedElement.innerHTML = `<i class="bi bi-wind"></i> Wind: ${windSpeed} km/h`;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `<i class="bi bi-droplet"></i> Humidity: ${humidity}%`;

  let weatherDescriptionElement = document.querySelector(
    "#weather-description"
  );
  weatherDescriptionElement.innerHTML = `${weatherDescription}`;
  //Day and time
  let currentDate = new Date();
  let dateElement = document.querySelector("#day-time");
  dateElement.innerHTML = formatDate(currentDate);
}
let cityForm = document.querySelector("#city-form");
cityForm.addEventListener("submit", defineCity);

searchCity("New York");

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
