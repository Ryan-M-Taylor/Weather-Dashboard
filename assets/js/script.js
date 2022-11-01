const searchButton = document.querySelector('.btn');
const searchEl = document.querySelector('.form-control');



const handleSearch = (event) => {
    event.preventDefault();
    let searchInput = searchEl.value.trim();
    let weatherURL = `api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=aec02913dbb17f078614aebbba4d5805`;
    fetch(weatherURL)
        .then(function(response){
            return response.json();
        })
        .then(function (data){
            console.log(data);
        });
}

searchButton.addEventListener('click', handleSearch)
