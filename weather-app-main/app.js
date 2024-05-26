// const cityName = document.getElementById('searchInput').value;

const temp = document.getElementById('temp'),
    tempMain = document.getElementById('tempMain'),
    feelLikeBox = document.getElementById('feelLike'),
    min = document.getElementById('min'),
    max = document.getElementById('max'),
    locationName = document.getElementById('location'),
    weatherStatus = document.getElementById('weatherStatus'),
    humidity = document.getElementById('humidity'),
    windSpeed = document.getElementById('windSpeed'),
    pressure = document.getElementById('pressure'),
    visibility = document.getElementById('visibilty'),
    sunrise = document.getElementById('sunrise'),
    sunset = document.getElementById('sunset'),
    // cityName = document.getElementById('searchInput'),
    sunriseIcon = document.getElementById('icon'),
    weatherCon = document.querySelector('.weatherCon'),
    mainIcon = document.querySelector('.mainIcon'),
    container = document.querySelector('.container')

let cityName = 'karachi'
let imageUrl;
let opacity = 0.5;

let currentTime = new Date();

function makeEditable(element) {
    const currentText = element.innerText;
    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.size = currentText.length;
    input.className = 'editable';

    element.innerHTML = '';
    element.appendChild(input);

    input.focus();

    input.addEventListener('blur', () => {
        const newText = input.value; element.innerHTML = newText;
        cityName = newText
        console.log(newText)
    });
    input.addEventListener('input', () => {
        cityName = input.value;
    })

    input.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            input.blur();
            getWeather()
        }
    });
}

document.querySelectorAll('.editable').forEach((element) => {
    element.addEventListener('click', () => makeEditable(element));
});


// Get Weather Function   
const getWeather = () => {
    const p = fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=5e8cb2874330f87f5695ebbb128be484&q=${cityName}`)
        .then((response) => {
            // console.log(response)
            return response.json()
        })
        .then((response) => {
            console.log(response)
            let temprature = Math.round(response.main.temp)
            let feelLike = Math.round(response.main.feels_like)
            temp.innerText = temprature
            feelLikeBox.innerText = feelLike
            min.innerText = `${Math.round(response.main.temp_min)} °`
            max.innerText = `${Math.round(response.main.temp_max)} °`
            tempMain.innerText = `${Math.round(response.main.temp)} `
            locationName.innerText = response.name
            weatherStatus.innerText = response.weather[0].description
            humidity.innerText = `${response.main.humidity}%`
            let windspeedInKilometer = response.wind.speed * 3.6
            windSpeed.innerText = `${windspeedInKilometer.toFixed(2)} km/h`
            pressure.innerText = ` ${response.main.pressure} mBar`
            let visibilityinKilometer = response.visibility / 1000;
            visibility.innerHTML = `${visibilityinKilometer} km`

            // sunrise & sunset time
            let sunriseDate = new Date(response.sys.sunrise * 1000)
            let sunsetDate = new Date(response.sys.sunset * 1000)
            // let sunsetTime = Number(moment(sunsetDate).format("h"));
            // let hours = Number(moment(currentTime).format('h'))
            sunrise.innerText = `${moment(sunriseDate).format("h:mm")} am`;
            sunset.innerText = ` ${moment(sunsetDate).format("h:mm")} pm`;


            icon.innerHTML = `<img src="./icon/sunrise1.png">`
            mainIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"/>`
            container.style.color= '#000'

            if (response.weather[0].main === "Thunderstorm") {
                container.style.backgroundImage = `url('img/night/thunderstrom.jpg')`
                weatherCon.style.backgroundImage = `url('img/night/thunderstrom.jpg')`
            } else if (response.weather[0].main === "Drizzle") {
                container.style.backgroundImage = `url('img/night/drizzle.jpg')`
                weatherCon.style.backgroundImage = `url('img/night/drizzle.jpg')`
            } else if (response.weather[0].main === "Rain") {
                container.style.backgroundImage = `url('img/day/rain.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/rain.jpg')`
                container.style.color = "#fff"
            } else if (response.weather[0].main === "Snow") {
                container.style.backgroundImage = `url('img/day/snowy.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/snowy.jpg')`
            } else if (response.weather[0].main === "Clear") {
                container.style.backgroundImage = `url('img/day/clear.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/clear.jpg')`
            } else if (response.weather[0].main === "Clouds") {
                container.style.backgroundImage = `url('img/day/Cloudyday.jpeg.avif')`
                weatherCon.style.backgroundImage = `url('img/day/Cloudyday.jpeg.avif')`
            } else if (response.weather[0].main === "Mist") {
                container.style.backgroundImage = `url('img/day/mist.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/mist.jpg')`
            } else if (response.weather[0].main === "Smoke") {
                container.style.backgroundImage = `url('img/day/smoke.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/smoke.jpg')`
            } else if (response.weather[0].main === "Haze") {
                container.style.backgroundImage = `url('img/day/haze.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/haze.jpg')`
                container.style.color = "#fff"
            } else if (response.weather[0].main === "Dust") {
                container.style.backgroundImage = `url('img/day/dust-storm.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/dust-storm.jpg')`
            } else if (response.weather[0].main === "Fog") {
                container.style.backgroundImage = `url('img/day/snowy.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/snowy.jpg')`
            } else if (response.weather[0].main === "Sand") {
                container.style.backgroundImage = `url('img/day/sand.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/sand.jpg')`
            } else if (response.weather[0].main === "Ash") {
                container.style.backgroundImage = `url('img/day/ash.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/ash.jpg')`
            } else if (response.weather[0].main === "Squall") {
                container.style.backgroundImage = `url('img/day/snowy.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/snowy.jpg')`
            } else if (response.weather[0].main === "Tornado") {
                container.style.backgroundImage = `url('img/day/tornado.jpg')`
                weatherCon.style.backgroundImage = `url('img/day/tornado.jpg')`
            }
        })
        .catch((err) => {
            console.log(err)
        })
}
getWeather()
