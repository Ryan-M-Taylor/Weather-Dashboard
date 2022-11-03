const searchButton = document.querySelector(".btn");
const searchEl = document.querySelector(".form-control");
const cityInfo = document.querySelector(".city-info");
const fiveDay = document.querySelector(".five-day");

const handleSearch = (event) => {
  event.preventDefault();
  let searchInput = searchEl.value.trim();
  let weatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=aec02913dbb17f078614aebbba4d5805`;
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayCurrentDate(data);
      displayForecast(event);
    });
};

const displayCurrentDate = (data) => {
  let latitude = data[0].lat;
  let longitude = data[0].lon;
  let currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aec02913dbb17f078614aebbba4d5805&units=imperial`;
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      const date = new Date();
      let todaysDate = date.toLocaleDateString();
      cityInfo.innerHTML = `
     <h2>${data.name} (${todaysDate}) <img src="http://openweathermap.org/img/w/${data.weather[0].icon}.png"><h2>
     <h5>Temp: ${data.main.temp}°F<h5>
     <h5>Wind: ${data.wind.speed} MPH<h5>
     <h5>Humidity: ${data.main.humidity} %<h5>`;
    });
};

const displayForecast = (event) => {
  event.preventDefault();
  let searchInput = searchEl.value.trim();
  let fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=aec02913dbb17f078614aebbba4d5805&units=imperial`;
  fetch(fiveDayForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      
      let count = 0;
      let template = "";

    //   data.list.forEach(function (list) {
    //     count++;

    //     if ((list.dt_txt = "12:00:00" && count < 6)) {
    //       template += `
    //         <div class="card col-2 bg-primary">
    //             <div class="card-body">
    //                 <h5><img src="http://openweathermap.org/img/w/${list.weather[0].icon}.png"><h5>
    //                 <h5>${list.main.temp}°F</h5>
    //                 <h5>${list.wind.speed} MPH</h5>
    //                 <h5>${list.main.humidity} %</h5>
    //             </div>
    //         </div>`;
    //       fiveDay.innerHTML = template;
    //     }
    //   });
    });
};

searchButton.addEventListener("click", handleSearch);
