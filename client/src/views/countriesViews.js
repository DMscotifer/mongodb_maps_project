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
