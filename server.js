'use strict';

const _express = require('express');
const _cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT;

const app = _express();

app.use(_cors());

app.get('/location', (request,response) => {
  const locationData = searchToLatLong(request.query.data);
  response.send(locationData);
  response.send('hello');
});


function searchToLatLong(query) {
  // Go to google (tomorrow)
  const googleData = require('./data/geo.json');
  const location = new Location(googleData.results[0]);
  location.search_query = query;
  return location;
}

function Location(data) {
//   this.formatted_query = data.formatted_address;
  this.latitude = data.geometry.location.lat;
  this.longitude = data.geometry.location.lng;
}

app.listen(PORT, () => console.log(`App is up on ${PORT}`) );
