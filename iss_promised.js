const request = require('request-promise-native');

const fetchMyIP = () => {
  return request(`https://api.ipify.org?format=json`);
};

const fetchCoordsByIP = body => {
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};

const fetchISSFlyOverTimes = body => {
  const lat = JSON.parse(body).latitude.toString(10);
  const long = JSON.parse(body).longitude.toString(10);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${lat}&lon=${long}`);
};

const nextISSTimesForMyLocation = () => {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
};

module.exports = { nextISSTimesForMyLocation };