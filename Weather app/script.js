//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
// 1f15b67c9afe84a6a53dbbcb3a63591a
//https://api.openweathermap.org/data/2.5/weather?q=germany&appid=1f15b67c9afe84a6a53dbbcb3a63591a&units=metric


const apiKey = "1f15b67c9afe84a6a53dbbcb3a63591a";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.getElementById("input");
const searchBtn = document.getElementById("btn");
const weatherIcon = document.getElementsByClassName("weather-icon")[0];


async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if(response.status == 404)
    {
        console.log('Hello');
        document.getElementsByClassName("error")[0].style.display="block";
        return;
    }
    else{
        document.getElementsByClassName("error")[0].style.display = "none";
    }
    var data = await response.json();

    document.getElementsByClassName("city")[0].innerHTML = data.name;
    document.getElementsByClassName("temp")[0].innerHTML = Math.round(data.main.temp) + "°C";
    document.getElementsByClassName("humidity")[0].innerHTML = data.main.humidity + "%";
    document.getElementsByClassName("wind")[0].innerHTML = data.wind.speed + " km/h";
    console.log(data.weather[0].main);

    if(data.weather[0].main == "Clouds")
    {
        weatherIcon.src="images/clouds.png";
    }
    else if(data.weather[0].main == "Clear")
    {
        weatherIcon.src="images/clear.png";
    }
    else if(data.weather[0].main == "Rain")
    {
        weatherIcon.src="images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle")
    {
        weatherIcon.src="images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist")
    {
        weatherIcon.src="images/mist.png";
    }
    else if(data.weather[0].main == "Snow")
    {
        weatherIcon.src="images/snow.png";
    }
}

searchBtn.addEventListener('click',()=>{
    checkWeather(searchBox.value);
    searchBox.value="";
});


