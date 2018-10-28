'use strict';

const _express = require('express');
const _cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const app = _express();

app.use(_cors());

app.get('/location', (request,response) => {
  let locationData = searchToLatLong(request.query.data)
  response.send(locationData);
});


function searchToLatLong(query) {
  const googleData = require('./data/geo.json');
  // console.log('This is my googleData: ', googleData);
  const location = new Location(googleData.results[0]);
  location.search_query = query;
  console.log(location);
  return location;
}

function Location(data) {
  this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

// attribute to John Cokos - demo code from github 10/22/2018.

// listener for ajax request on the front end. once this event has been detected, the callback function
// is triggered.
app.get('/weather', (request, response) => {
  let weatherDataNormalized = searchToWeather(request.query.data)
  response.send(weatherDataNormalized)
})

function searchToWeather(query) {
  let weeklyForecast = []
  const weatherDataRaw = require('./data/darksky.json');
  weatherDataRaw.daily.data.forEach( day => {
    const daysForecast = new Weather(day.summary, day.time);
    weeklyForecast.push(daysForecast);
    daysForecast.search_query = query;
  });
  return weeklyForecast;
}

function Weather(forecast, timeInMill) {
  let date = new Date(timeInMill*1000).toString();
  let dateString = date.toString().slice(0,15);
  this.forecast = forecast;
  this.time = dateString;
}

// function errorHandler(error, response){
//   console.error('Error: ', error);
//   if (response) response.status(500).send('Sorry, an error occurred.');

// }


app.listen(PORT, () => console.log(`App is up on ${PORT}`) );




