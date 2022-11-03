const searchButton = document.querySelector('.btn');
const searchEl = document.querySelector('.form-control');
const cityInfo = document.querySelector('.city-info');


const handleSearch = (event) => {
    event.preventDefault();
    let searchInput = searchEl.value.trim();
    let weatherURL = `http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=aec02913dbb17f078614aebbba4d5805`;
    fetch(weatherURL)
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            console.log(data);
            displayData(data);
        });
}

const displayData = (data) => {
     let latitude = data[0].lat
     let longitude = data[0].lon
     let currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=aec02913dbb17f078614aebbba4d5805&units=imperial`;
     fetch(currentWeather)
     .then(function(response){
         return response.json()
     })
     .then(function(data){
         console.log(data);

     });
}
   


searchButton.addEventListener('click', handleSearch)
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=aec02913dbb17f078614aebbba4d5805`;