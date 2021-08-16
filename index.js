//time and day
let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[now.getDay()];
let hour = now.getHours();
let minutes = now.getMinutes();

if (minutes < 10) {
  minutes = `0${now.getMinutes()}`;
}
let today = document.querySelector("#today-date");
today.innerHTML = `${day} ${hour}:${minutes}`;

//forecast
function formatDay(timestamp) {
  let date = new Date(timestamp + 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="36"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">${Math.round(
          forecastDay.temp.max
        )} </span>
        <span class="weather-forecast-temperature-min">${Math.round(
          forecastDay.temp.min
        )} </span>
      </div>
    </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "853a11ba7c5104766d458d020002f62f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

//search CIty
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#searchCity");
  searchInput.value = searchInput.value.toUpperCase();
  searchInput.value = searchInput.value.trim();
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;
  searchCity(searchInput.value);
}
function searchCity(city) {
  let apiKey = "853a11ba7c5104766d458d020002f62f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let form = document.querySelector("form");
form.addEventListener("submit", search);

//weather data
function showTemperature(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = `Humidity: ${humidity}%`;
  let wind = Math.round(response.data.wind.speed);
  let currentWind = document.querySelector("#wind");
  currentWind.innerHTML = `Wind: ${wind}km/h`;
  document.querySelector("#condition").innerHTML =
    response.data.weather[0].main;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}
function searchLocation(position) {
  let apiKey = "853a11ba7c5104766d458d020002f62f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let changeCity = document.querySelector("#searchBar");
changeCity.addEventListener("submit", search);
let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", getCurrentLocation);
searchCity("Singapore");
