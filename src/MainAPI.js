const GeoAPI = require('./GeoAPI');
const WeatherAPI = require('./WeatherAPI');
const jsonMerger = require('json-merger');

const location = process.argv[2];

// var urllink = ' ';
// // Raw Api - https://api.darksky.net/forecast/2f894ae3eb25e36724815277a2b97a71/37.8267,-122.4233
// const urllink1 = 'https://api.darksky.net/forecast/2f894ae3eb25e36724815277a2b97a71/';

const MainAPI = (location, callback) => {
    if (!location) {
        console.log('Location is blank')
    } else {
        GeoAPI(location, (error, data1) => {
            if (error) {
                console.log('GeoAPI Error: ' + error)
                callback(error, undefined)
            } else {
                console.log('GeoAPI Data: ' + JSON.stringify(data1))
                WeatherAPI(data1.Longitude,data1.Latitude, (error, data2) => {
                    if (error) {
                        console.log('WeatherAPI Error: ' + error);
                        callback(error, undefined)        
                    } else {
                        console.log(data2.Aqius)
                        if (data2.Aqius <= 50) {
                            data3 = {
                                PollutionCategory: 'Good - Ideal air quality for outdoor activities' 
                            }
                        } else if (data2.Aqius > 50 && data2.Aqius <=100) {
                            data3 = {
                                PollutionCategory: 'Moderate - No need to modify your usual outdoor activities unless you experience symptoms such as coughing and throat irritation.'
                            }
                        } else if (data2.Aqius > 100 && data2.Aqius <=150) {
                            data3 = {
                                PollutionCategory: 'Unhealthy for Sensitive Groups - Consider reducing or rescheduling strenuous activities outdoors if you experience symptoms such as coughing and throat irritation.'
                            }
                        } else if (data2.Aqius > 150 && data2.Aqius <=200) {
                            data3 = {
                                PollutionCategory: 'Unhealthy - Reduce or reschedule strenuous activities outdoors. Children and the elderly should also take it easy.'
                            }
                        } else if (data2.Aqius > 200 && data2.Aqius <=500) {
                            data3 = {
                                PollutionCategory: 'Very Unhealthy/Hazardous - Avoid strenuous activities outdoors. Children and the elderly should also avoid outdoor physical exertion.'
                            }
                        }
                        var data = jsonMerger.mergeObjects([data1, data2, data3]);  
                        console.log(data)
                        callback(undefined, {
                            WeatherData: data        
                        })                      
                    }   
                })      
            }
        })
    }
}

module.exports = MainAPI;
