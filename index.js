//time and day
let now = new Date();
let date = now.getDate();
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
let today = document.querySelector("#today-date");
today.innerHTML = `${day} ${hour}:${minutes}`;

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

//converting temperature

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col-2">
      <div class="weather-forecast-date">${day}</div>
      <img
        src="https://icons-for-free.com/iconfiles/png/512/sunny+temperature+weather+icon-1320196637430890623.png"
        alt=""
        width="36"
      />
      <div class="weather-forecast-temperature">
        <span class="weather-forecast-temperature-max">18 </span>
        <span class="weather-forecast-temperature-min">12 </span>
      </div>
    </div>
  `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

displayForecast();

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
