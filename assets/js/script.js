const searchButton = document.querySelector(".btn");
const searchEl = document.querySelector(".form-control");
const cityInfo = document.querySelector(".city-info");
const fiveDay = document.querySelector(".five-day");
const recentSearch = document.querySelector(".recent-search");

let count = 0;
let template = "";

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
   
    let addButton = document.createElement("button");
    addButton.textContent = searchInput;
    addButton.type="button";
    addButton.classList = "btn btn-secondary col-12 mt-3";
    recentSearch.appendChild(addButton);
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
     
      data.list.forEach(function (list) {
        if ((list.dt_txt.split(" ")[1] == "12:00:00" && count < 6)) {
            count++;
          template += `
            <div class="card col-2 mt-3">
                <div class="card-body">
                    <h5>${list.dt_txt.split(" ")[0]}</h5>
                    <h5><img src="http://openweathermap.org/img/w/${list.weather[0].icon}.png"><h5>
                    <h5>${list.main.temp}°F</h5>
                    <h5>${list.wind.speed} MPH</h5>
                    <h5>${list.main.humidity} %</h5>
                </div>
            </div>`;
          fiveDay.innerHTML = template;
        }
      });
    });
};

// const storeData = ({arg1:lastSearchData, arg2:lastForecastData}) => {
//     localStorage.setItem('recentCurrent', JSON.stringify(lastSearchData))
//     localStorage.setItem('recentForecast', JSON.stringify(lastForecastData))
// }

searchButton.addEventListener("click", handleSearch);
// searchButton.addEventListener('click', storeData)

// searchButton.addEventListener("click", function (event) {
//     event.preventDefault();
//     handleSearch(event);
//     var city = { name: searchInput.value};
//     var getCurrent = JSON.parse(localStorage.getItem("recentCurrent")) || [];
//     var getForecast = JSON.parse(localStorage.getItem("recentForecast")) || [];
//     getCurrent.push(city);
//     getForecast.push(city)
//     searchInput.value = "";
//     });