const apiKey = 'ae75e69a8efa113351ebd46e11e7df1e';
let apiUrl;
var lat = 0.0;
var long = 0.0;

function degreesToDirection(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
}

function changeBackgroundColor() {
    var date = new Date();
    var hour = date.getHours();
    hour = hour;

    // Calculate RGB values based on hour and ratio
    var red = Math.max(0, 48 - (hour * 2));
    var green = Math.max(0, 192 - (hour * 8));
    var blue = Math.max(0, 240 - (hour * 10));
    console.log("rgb color: ", red, green, blue);

    var weatherContainers = document.getElementById('weatherContainer');
    weatherContainers.style.backgroundColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
}


async function checkWeather() {
    console.log("checking weather...");
    const response = await fetch(apiUrl);
    var data = await response.json();
    changeBackgroundColor();

    const weatherDescription = data.weather[0].description;
    const weatherIconCode = data.weather[0].icon;

    const weatherTemperature = data.main.temp;

    const weatherFeelsLike = data.main.feels_like;
    const weatherHumidity = data.main.humidity;
    const weatherWindSpeed = data.wind.speed;
    const weatherWindDirection = degreesToDirection(data.wind.deg);
    const weatherClouds = data.clouds.all;

    const weatherLocation = data.name;
    const weatherLocationCountry = data.sys.country;

    //for weather desc
    let weatherDesc = document.createElement('div');
    weatherDesc.id = 'weatherDesc';
    document.getElementById('weatherHeader').appendChild(weatherDesc);
    weatherDesc.textContent = weatherDescription;

    //for weather icon
    let weatherIcon = document.createElement('div');
    weatherIcon.id = 'weatherIcon';
    document.getElementById('weatherHeader').appendChild(weatherIcon);

    let icon = document.createElement('img');
    icon.src = `http://openweathermap.org/img/w/${weatherIconCode}.png`;
    weatherIcon.innerHTML = '';
    weatherIcon.appendChild(icon);

    //for weather temp
    let temp = document.createElement('span');
    temp.textContent = `${weatherTemperature}˚F`;
    temp.style.color = 'white';
    document.getElementById('weatherTemp').appendChild(temp);

    //for weather feels like
    let feelsLike = document.createElement('span');
    feelsLike.textContent = `Feels like: ${weatherFeelsLike}˚F`;
    feelsLike.style.color = 'white';
    document.getElementById('weatherFeelsLike').appendChild(feelsLike);

    //for weather humidity 
    let humidity = document.createElement('span');
    humidity.textContent = `Humidity: ${weatherHumidity}%`;
    humidity.style.color = 'white';
    document.getElementById('weatherHumidity').appendChild(humidity);

    //for weather wind 
    let wind = document.createElement('span');
    wind.textContent = `Wind: ${weatherWindSpeed} MPH ${weatherWindDirection}`;
    wind.style.color = 'white';
    document.getElementById('weatherWind').appendChild(wind);

    //for weather clouds 
    let clouds = document.createElement('span');
    clouds.textContent = `Cloudiness: ${weatherClouds}%`;
    clouds.style.color = 'white';
    document.getElementById('weatherClouds').appendChild(clouds);

    //for weather location
    let location = document.createElement('span');
    location.textContent = `Weather for ${weatherLocation}, ${weatherLocationCountry}`;
    location.style.color = 'white';
    document.getElementById('weatherLocation').appendChild(location);
}



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
        async position => {
            lat = position.coords.latitude;
            long = position.coords.longitude; 

            apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
            checkWeather(); 
        }
    );
}
else {
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=43.082700&lon=-77.671420&units=imperial&appid=${apiKey}`;
    checkWeather(); 
}
