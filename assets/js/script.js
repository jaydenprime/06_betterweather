
renderHistory();
var recent = []

// Function to City Name Search
function weather(cityName) {
var requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&current.uvi&appid=${api.key}`;
fetch(requestUrl)
    .then((response) => {
        return response.json()
    })
    .then((data) => {

        // Variables for longitude/latitude; Calls variable in forecast function
        var lon = JSON.stringify(data.coord.lon)
        var lat = JSON.stringify(data.coord.lat)
        forecast(lon, lat)

        // Variables for current weather
        var date = cityName + ' - ' + moment().format('MMM Do YYYY')
        var temp = 'Temp: ' + JSON.stringify(data.main.temp) + ' ' + '°F'
        var wind = 'Wind: ' + JSON.stringify(data.wind.speed) + ' ' + 'MPH'
        var humidity = 'Humidity: ' + JSON.stringify(data.main.humidity) + ' ' + '%'
        document.getElementById("date").innerHTML = date
        document.getElementById("temp").innerHTML = temp
        document.getElementById("wind").innerHTML = wind
        document.getElementById("humidity").innerHTML = humidity

        console.log(data)
    })
    .catch(error => {
      console.log(error)
    })

}

// Function for Search
function search(){
    var cityName = document.getElementById("cityName").value;
    weather(cityName);
    recent.push(cityName);
    localStorage.setItem("cityName", JSON.stringify(recent));
    var searchHistory = JSON.parse(localStorage.getItem('cityName'));
    renderHistory(searchHistory);
    
}


// Displays recent search history
function renderHistory(searchHistory) {
    if (searchHistory) {
      document.getElementById('recent-searches').innerHTML = '';
      searchHistory.forEach((city) => {
        var button = document.createElement('button');
        button.textContent = city;
        button.addEventListener('click', () => weather(city));
        document.getElementById('recent-searches').appendChild(button);
        document.getElementById('recent-searches').appendChild(document.createElement('br'));
      });
    }
  }



// Function to call for coordinates from weather function, 5 day forecast
function forecast(longitude, latitude) {
    var forecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=imperial&appid=${api.key}`;
    fetch(forecastUrl)
        .then((response) => {
            return response.json()
        })
        .then((data) => {

            // Variable for UV index
            var uvIndex = data.current.uvi
            var uvi = document.getElementById("uvi")
            uvi.innerText = 'UV Index: ' + uvIndex
            
            // Changes background color based on UV index
            if (uvIndex >= 0) {
                uvi.setAttribute("class", "great")
            }
            if (uvIndex > 2 && uvIndex < 5) {
                uvi.setAttribute("class", "good")
            }
            if (uvIndex > 6) {
                uvi.setAttribute("class", "bad")
            }

            console.log(uvIndex)
            
            // Variables for 5 day forecast
            var date1 = moment().calendar()
            var date2 = moment().add(1, 'days').calendar()
            var date3 = moment().add(2, 'days').calendar()
            var date4 = moment().add(3, 'days').calendar()
            var date5 = moment().add(4, 'days').calendar()

            var temp1 = 'Temp: ' + JSON.stringify(data.daily[0].temp.day) + ' ' + '°F'
            var temp2 = 'Temp: ' + JSON.stringify(data.daily[1].temp.day) + ' ' + '°F'
            var temp3 = 'Temp: ' + JSON.stringify(data.daily[2].temp.day) + ' ' + '°F'
            var temp4 = 'Temp: ' + JSON.stringify(data.daily[3].temp.day) + ' ' + '°F'
            var temp5 = 'Temp: ' + JSON.stringify(data.daily[4].temp.day) + ' ' + '°F'

            var wind1 = 'Wind: ' + JSON.stringify(data.daily[0].wind_speed) + ' ' + 'MPH'
            var wind2 = 'Wind: ' + JSON.stringify(data.daily[1].wind_speed) + ' ' + 'MPH'
            var wind3 = 'Wind: ' + JSON.stringify(data.daily[2].wind_speed) + ' ' + 'MPH'
            var wind4 = 'Wind: ' + JSON.stringify(data.daily[3].wind_speed) + ' ' + 'MPH'
            var wind5 = 'Wind: ' + JSON.stringify(data.daily[4].wind_speed) + ' ' + 'MPH'

            var humidity1 = 'Humidity: ' + JSON.stringify(data.daily[0].humidity) + ' ' + '%'
            var humidity2 = 'Humidity: ' + JSON.stringify(data.daily[1].humidity) + ' ' + '%'
            var humidity3 = 'Humidity: ' + JSON.stringify(data.daily[2].humidity) + ' ' + '%'
            var humidity4 = 'Humidity: ' + JSON.stringify(data.daily[3].humidity) + ' ' + '%'
            var humidity5 = 'Humidity: ' + JSON.stringify(data.daily[4].humidity) + ' ' + '%'

            var iconCode1 = data.daily[0].weather[0].icon
            var iconCode2 = data.daily[1].weather[0].icon
            var iconCode3 = data.daily[2].weather[0].icon
            var iconCode4 = data.daily[3].weather[0].icon
            var iconCode5 = data.daily[4].weather[0].icon
        
            var iconUrl1 = `http://openweathermap.org/img/w/${iconCode1}.png`
            var iconUrl2 = `http://openweathermap.org/img/w/${iconCode2}.png`
            var iconUrl3 = `http://openweathermap.org/img/w/${iconCode3}.png`
            var iconUrl4 = `http://openweathermap.org/img/w/${iconCode4}.png`
            var iconUrl5 = `http://openweathermap.org/img/w/${iconCode5}.png`

            var forecast1 = date1 + "<br/>" + temp1 + "<br/>" + wind1 + "<br/>" + humidity1
            var forecast2 = date2 + "<br/>" + temp2 + "<br/>" + wind2 + "<br/>" + humidity2
            var forecast3 = date3 + "<br/>" + temp3 + "<br/>" + wind3 + "<br/>" + humidity3
            var forecast4 = date4 + "<br/>" + temp4 + "<br/>" + wind4 + "<br/>" + humidity4
            var forecast5 = date5 + "<br/>" + temp5 + "<br/>" + wind5 + "<br/>" + humidity5

            document.getElementById("wicon1").src = iconUrl1
            document.getElementById("wicon2").src = iconUrl2
            document.getElementById("wicon3").src = iconUrl3
            document.getElementById("wicon4").src = iconUrl4
            document.getElementById("wicon5").src = iconUrl5

            document.getElementById("cast1").innerHTML = forecast1
            document.getElementById("cast2").innerHTML = forecast2
            document.getElementById("cast3").innerHTML = forecast3
            document.getElementById("cast4").innerHTML = forecast4
            document.getElementById("cast5").innerHTML = forecast5


            console.log(data)
        })
        .catch(error => {
          console.log(error)
        })
}