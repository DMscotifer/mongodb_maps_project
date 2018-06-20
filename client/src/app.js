const CountriesViews = require('./views/countriesViews');
const Request = require('./services/request.js');

const countriesViews = new CountriesViews();
const request = new Request('https://restcountries.eu/rest/v2/all');


const appStart = function() {
  request.get(getCountriesRequestComplete);
}

const getCountriesRequestComplete = function(allCountries) {
  allCountries.forEach(function(country) {
    countriesViews.addCountry(country);
  })
}


window.addEventListener('load', appStart);
