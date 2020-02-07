const request = require('request');

//***************************************************************************************************** */
// Fetches the Current Weather Forecase information along with pollution indexes for given co-ordinates
// forom Airvisual API. The Raw API link is given below
// //Raw Api - https://api.airvisual.com/v2/nearest_city?lat=12.96991&lon=77.59796&key=aa436131-8964-4e88-a550-d0cf2459bfe8
//***************************************************************************************************** */

//Raw Api - https://api.airvisual.com/v2/nearest_city?lat=12.96991&lon=77.59796&key=aa436131-8964-4e88-a550-d0cf2459bfe8
const pollutionapi1 = 'https://api.airvisual.com/v2/nearest_city?lat=';
const pollutionapikey = '&key=aa436131-8964-4e88-a550-d0cf2459bfe8';

const WeatherAPI = (Longitude, Latitude, callback) => {
    const WeatherAPIUrl = pollutionapi1 + Latitude + '&lon=' + Longitude + pollutionapikey;
    request({url: WeatherAPIUrl, json: true}, (Error, Response) => {
        if (Error) {
            callback('Internal error , incorrect ordinates', undefined);
        } else if (Response.body.status === 'fail') {
            callback('Invalid Data passed - Try another location', undefined);
        } else {
            callback(undefined, {
                Temperature: Response.body.data.current.weather.tp,
                Humidity: Response.body.data.current.weather.hu,
                Aqius: Response.body.data.current.pollution.aqius,
                Aqicn: Response.body.data.current.pollution.aqicn
            })
        }
    })
};

module.exports = WeatherAPI;
