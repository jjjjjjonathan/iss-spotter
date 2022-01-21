const request = require('request');

const fetchMyIP = callback => {
  request(`https://api.ipify.org?format=json`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response ${body}`;
      callback(Error(msg), null);
    }
    const ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request(`https://api.freegeoip.app/json/${ip}?apikey=2d28bea0-7a5e-11ec-a5d7-4bc084a1f94d`, (error, response, body) => {
    if (error) return callback(error, null);
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      return callback(Error(msg), null);
    }
    const lat = JSON.parse(body).latitude;
    const long = JSON.parse(body).longitude;
    return callback(null, {latitude: lat.toString(10), longitude: long.toString(10)});
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };