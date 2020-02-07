console.log('Web browser script to fetch the data')

const weatherform = document.querySelector('form');
const search = document.querySelector('input')
const errormessage = document.querySelector('#message-1')
const renderLongitude = document.querySelector('#message-2')
const renderLatitude = document.querySelector('#message-3')
const renderTemperature = document.querySelector('#message-4')
const renderHumidity = document.querySelector('#message-5')
const renderAQI = document.querySelector('#message-6')


weatherform.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    errormessage.textContent = 'Loading...'
    renderLongitude.textContent = ' '
    renderLatitude.textContent = ' '
    renderTemperature.textContent = ' '
    renderHumidity.textContent = ' '
    renderAQI.textContent = ' '
    fetch('/location?address=' + location).then((response) => {
        response.json().then((data) => {
            console.log(data.error)
            if (data.error) {
                errormessage.textContent = data.error
            } else {
                errormessage.textContent = data.WeatherData.Place
                renderLongitude.textContent = 'Longitude: ' + data.WeatherData.Longitude
                renderLatitude.textContent = 'Latitude: ' + data.WeatherData.Longitude
                renderTemperature.textContent = 'Current temperature: ' + data.WeatherData.Temperature + ' Celsius'
                renderHumidity.textContent = 'Humidity: ' + data.WeatherData.Humidity + '%'
                renderAQI.textContent = 'Air Quality Index: ' +  data.WeatherData.Aqius + ', Levels of Health Concern: ' + data.WeatherData.PollutionCategory 
            }
        })
    })
});