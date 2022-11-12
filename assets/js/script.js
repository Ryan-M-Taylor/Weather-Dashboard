const searchButton = document.querySelector(".btn");
const searchEl = document.querySelector(".form-control");
const cityInfo = document.querySelector(".city-info");
const fiveDay = document.querySelector(".five-day");
const recentSearch = document.querySelector(".recent-search");

//function to fetch the API
const fetchAPI = (randomCity) => {
  let weatherURL = `https://api.openweathermap.org/geo/1.0/direct?q=${randomCity}&limit=1&appid=aec02913dbb17f078614aebbba4d5805`;
  fetch(weatherURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayCurrentDate(data);
      displayForecast(randomCity);
    });
};

//when search button is clicked, this function takes the search input, stores it, and runs it through the fetchAPI function
const handleSearch = (event) => {
  event.preventDefault();
  let searchInput = searchEl.value.trim();
  storeData(searchInput);
  fetchAPI(searchInput);
};

//this function gets the latitude and longitude from the geolocator API. then uses that data to get the current weather for the city
const displayCurrentDate = (data) => {
  let latitude = data[0].lat;
  let longitude = data[0].lon;
  let currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aec02913dbb17f078614aebbba4d5805&units=imperial`;
  fetch(currentWeather)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const date = new Date();
      let todaysDate = date.toLocaleDateString();
      cityInfo.innerHTML = `
      <h2>${data.name} (${todaysDate}) <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png"><h2>
      <h5>Temp: ${data.main.temp}°F<h5>
      <h5>Wind: ${data.wind.speed} MPH<h5>
     <h5>Humidity: ${data.main.humidity} %<h5>`;
    });
};

//function to get the 5 day forecast for the city
const displayForecast = (randomCity) => {
  let fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${randomCity}&appid=aec02913dbb17f078614aebbba4d5805&units=imperial`;
  fetch(fiveDayForecast)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      fiveDay.innerHTML = "";
      let template = "";
      let count = 0;
      data.list.forEach(function (list) {
        if (list.dt_txt.split(" ")[1] == "12:00:00" && count < 6) {
          count++;
          template += `
          <div class="card col-2 mt-3">
                <div class="card-body">
                <h5>${list.dt_txt.split(" ")[0]}</h5>
                <h5><img src="https://openweathermap.org/img/w/${
                  list.weather[0].icon
                }.png"><h5>
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

//when recent search button is clicked, this function gets the current weather and forecast
const handleStorageClick = (event) => {
  event.preventDefault();
  fetchAPI(event.target.textContent);
};

//function to handle local storage
const storeData = (lastSearchData) => {
  let getCurrent = JSON.parse(localStorage.getItem("recentCurrent")) || [];
  if (!getCurrent.includes(lastSearchData)) {
    getCurrent.push(lastSearchData);
  }
  if (getCurrent.length > 5) {
    getCurrent.shift();
  }
  localStorage.setItem("recentCurrent", JSON.stringify(getCurrent));
  loadData();
};

//function to load local storage and add recent search button
const loadData = () => {
  var getCurrent = JSON.parse(localStorage.getItem("recentCurrent")) || [];
  recentSearch.innerHTML = "";
  for (i = 0; i < getCurrent.length; i++) {
    let addButton = document.createElement("button");
    addButton.textContent = getCurrent[i];
    addButton.type = "button";
    addButton.classList = "btn btn-secondary col-12 mt-3";
    addButton.addEventListener("click", handleStorageClick);
    recentSearch.appendChild(addButton);
  }
};

//triggers handleSearch function with searchButton is clicked
searchButton.addEventListener("click", handleSearch);
loadData();
