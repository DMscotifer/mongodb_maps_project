const CountriesViews = require('./views/countriesViews');
const BucketlistViews = require('./views/bucketlistViews');
const Request = require('./services/request.js');

const countriesViews = new CountriesViews();
const bucketlistViews = new BucketlistViews();
const apiRequest = new Request('https://restcountries.eu/rest/v2/all');
const dbRequest = new Request('http://localhost:3000/api/countries');


const appStart = function() {
  console.log("appStart ran");
  apiRequest.get(getCountriesRequestComplete);

  const createListItem = document.querySelector("#country-select");
  createListItem.addEventListener("change", handleSelectCountry);

}

const getCountriesRequestComplete = function(allCountries) {
  allCountries.forEach(function(country) {
    countriesViews.addCountry(country);
  })
}

const createRequestComplete = function(savedCountry) {
  countriesViews.addCountry(savedCountry);
}

const handleSelectCountry = function() {
  // event.preventDefault();
  const selectedCountry = document.getElementById("country-select").value;
  console.log(selectedCountry);

  const countryToSend = {
    name: selectedCountry
  };
  dbRequest.post(countryToSend, createRequestComplete);
}

window.addEventListener('load', appStart);
