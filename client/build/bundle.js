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
const Request = __webpack_require__(2);

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

document.addEventListener("change", function() {
  const selectedCountry = document.getElementById("country-select").value;
  console.log(selectedCountry);

})

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

// CountriesViews.prototype.render = function(country){
//   const ul = document.querySelector('#countries');
//   const li = document.createElement('li');
//   const text = document.createElement('p');
//   text.innerText = `${country.name} - ${country.capital} - ${country.population}`;
//   li.appendChild(text);
//   ul.appendChild(li);
// }

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

Request.prototype.post = function (country, next) {
  const request = new XMLHttpRequest();
  request.open("POST", this.url);
  request.setRequestHeader("Content-Type", "application/json");
  request.addEventListener("load", function() {
    if (this.status !== 201) return;
    const responseBody = JSON.parse(this.response);
    next(responseBody);
  })
  request.send(JSON.stringify(country))
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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map