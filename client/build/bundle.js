/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const CountriesViews = __webpack_require__(1);
const BucketlistViews = __webpack_require__(3);
const Request = __webpack_require__(2);

const countriesViews = new CountriesViews();
const bucketlistViews = new BucketlistViews();
const apiRequest = new Request('https://restcountries.eu/rest/v2/all');
const dbRequest = new Request('http://localhost:3000/api/countries');


const appStart = function() {
  console.log("appStart ran");
  apiRequest.get(getCountriesRequestComplete);

  const createListItem = document.querySelector("#country-select");
  createListItem.addEventListener("change", handleSelectCountry);


  dbRequest.get(populateList);
}

const populateList = function(countriesData){
  countriesData.forEach(function(country){
    const ul = document.querySelector('#bucketlist');
    const li = document.createElement('li');
    li.textContent = country.name;
    ul.appendChild(li);
  })
}

const getCountriesRequestComplete = function(allCountries) {
  allCountries.forEach(function(country) {
    countriesViews.addCountry(country);
  })
}

const createRequestComplete = function(savedCountry) {
  countriesViews.addCountry(savedCountry);
  // bucketlistViews.addCountry(savedCountry);

}

const handleSelectCountry = function() {
  event.preventDefault();
  const selectedCountry = document.getElementById("country-select").value;
  console.log(selectedCountry);

  const countryToSend = {
    name: selectedCountry
  };
  dbRequest.post(countryToSend, createRequestComplete);
}

window.addEventListener('load', appStart);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var CountriesViews = function() {
  this.countries = [];
}

CountriesViews.prototype.addCountry = function(country) {
  this.countries.push(country);
  this.render(country);
}

CountriesViews.prototype.clear = function(country) {
  this.countries = [];
  const ul = document.querySelector('#countries');
  ul.innerHTML = '';
}

CountriesViews.prototype.render = function(country){
  const select = document.querySelector('#country-select');
  const option = document.createElement('option');
  option.textContent = country.name;
  option.value = country.name;
  select.appendChild(option);
}



module.exports = CountriesViews;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(next) {
  const request = new XMLHttpRequest();
  request.open("GET", this.url);
  request.addEventListener("load", function() {
    if (this.status !== 200) return;
    const responseBody = JSON.parse(this.response);
    next(responseBody);
  });
  request.send();
};

Request.prototype.post = function (country, next){
  console.log(country);
  const request = new XMLHttpRequest();
  request.open("POST", this.url);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function(){
    if (this.status !== 201) return;
    const responseBody = JSON.parse(this.response);
    next(responseBody);
  })
  const jsonCountry = JSON.stringify(country)
  console.log(jsonCountry);
  request.send(jsonCountry);
};

Request.prototype.delete = function(next) {
  const request = new XMLHttpRequest();
  request.open("DELETE",this.url);
  request.addEventListener("load", function(){
    if (this.status !== 204) return;
    next();
  })
  request.send()
}

module.exports = Request;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var BucketlistViews = function() {
  this.bucketlist = [];
}

BucketlistViews.prototype.addToList = function(bucketlist) {
  this.bucketlist.push(bucketlist);
  this.render(bucketlist);
}

BucketlistViews.prototype.render = function(country) {
  const ul = document.querySelector('#bucketlist');
  const li = document.createElement('li');
  const text = document.createElement('p');
  // text.innerText = `${country}`;
  text.innerText = country.name;

  li.appendChild(text);
  ul.appendChild(li);
}

module.exports = BucketlistViews;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map