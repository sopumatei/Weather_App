// Import API_KEY
import config from "./config.js"

// Search Elements
const searchInput = document.getElementById('search-input')
const searchButton = document.getElementById('search-button')

// Weather Information Elements
const rootContainer = document.getElementById('root-container')
const windHumidityContainer = document.getElementById('wind-humidity')

// Main Information
const mainInformationContainer = document.getElementById('main-information-container')
const cityNameTxt = document.getElementById('city-name')
const countryName = document.getElementById('country-name')
const temperatureText = document.getElementById('temperature')
const weatherText = document.getElementById('weather-text')
const weatherImg = document.getElementById('weather-img')

// Wind Information
const windSpeed = document.getElementById('wind-speed')

// Humidity Information
const humidityText = document.getElementById('humidity')

let canPressSearch = true

// Gets Weather Using API
function getWeather(cityName) {
    let exportData = {}
    function onError(error) {
        console.log(`ERROR: ${error}`);
        canPressSearch = false
        searchInput.value = 'ERROR'
        searchInput.style.color = 'tomato'
        setTimeout(() => {
            canPressSearch = true
            searchInput.value = ''
            searchInput.style.color = 'black'
        }, 800)
    }
    
    function displayData(data) {
        setTimeout(() => {
            windHumidityContainer.style.display = 'flex'
            mainInformationContainer.style.display = 'flex'
            rootContainer.style.height = '25em'
            rootContainer.style.padding = '1.2em'
            console.log(`Weather API was loaded successfully.`)
            setTimeout(() => {
                searchInput.value = ''
            }, 300)
        }, 300)
    }
    
    const weatherAPI = `https://api.weatherapi.com/v1/current.json?q=${cityName}&key=${config.API_KEY}`

    function fetchWeatherData() {
        return new Promise((resolve, reject) => {
            fetch(weatherAPI)
                .then(response => response.json())
                .then(data => {
                    resolve({
                        City: data.location.name,
                        Country: data.location.country,
                        LocalTime: data.location.localtime,
                        DayNight: data.current.is_day ? 'Day' : 'Night',
                        Temperature: data.current.temp_c,
                        Windspeed: data.current.wind_kph,
                        Weather: data.current.condition.text,
                        WeatherIcon: data.current.condition.icon,
                        Humidity: data.current.humidity
                    })
                })
                .catch(error => reject(error))
        })
    }
    
    fetchWeatherData()
        .then(data => {
            cityNameTxt.textContent = `${data.City}`
            countryName.textContent = `${data.Country}`
            temperatureText.textContent = `${data.Temperature}°C`
            weatherText.textContent = `${data.Weather}`
            weatherImg.setAttribute('src', `${data.WeatherIcon.replace('64', '128').replace('64', '128')}`)
            windSpeed.textContent = `${data.Windspeed}Km/H`
            humidityText.textContent = `${data.Humidity}%`
        })
        .then(displayData)
        .catch(onError)
}

searchButton.addEventListener('click', () => {
    if(searchInput.value && canPressSearch) {
        rootContainer.style.height = '4em'
        rootContainer.style.padding = '0.3em 0.4em'
        setTimeout(() => {
            windHumidityContainer.style.display = 'none'
            mainInformationContainer.style.display = 'none'
            getWeather(searchInput.value)
        }, 280)
        // searchInput.value = ''
    }
})


fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => console.log(data.ip));


