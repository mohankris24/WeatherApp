const request = require('request');

//***************************************************************************************************** */
// Fetches the Geo co-ordinates for given location forom Mapbox API. The Raw API link is given below
// //Raw Api - https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1I
//              joibW9oYW5rcmlzaCIsImEiOiJjazY3NjUybzIxZm03M2xxanFyc203cjIxIn0.D-luATa2m3d-tT365IFT6A
//***************************************************************************************************** */

const geolink1 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const geolink2 = '.json?access_token=pk.eyJ1IjoibW9oYW5rcmlzaCIsImEiOiJjazY3NjUybzIxZm03M2xxanFyc203cjIxIn0.D-luATa2m3d-tT365IFT6A&limit=1';

const GeoAPI = (Location, callback) => {
    const GeoUrl = geolink1 + Location + geolink2;

    request({ url:GeoUrl, json:true}, (Error, Response) => {
        if (Error) {
            callback('API Response Error' + Error, undefined);
        } else if (Response.body.features.length === 0) {
            callback('Invalid Data format/ Invalid location entered - Try again with another location', undefined);
        } else {
            callback (undefined, {
                Longitude: Response.body.features[0].center[0],
                Latitude: Response.body.features[0].center[1],
                Place: Response.body.features[0].place_name
            })
        }
    })
};

module.exports = GeoAPI;