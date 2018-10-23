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
  });


  function searchToLatLong(query) {
    // Go to google (tomorrow)
    const geoData = require(GOOGLE_MAPS);
    const location = new Location(geoData.results[0]);
      location.search_query = query;
    return location;
  }