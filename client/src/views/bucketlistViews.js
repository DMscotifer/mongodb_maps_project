var BucketlistViews = function() {
  this.bucketlist = [];
}

BucketlistViews.prototype.addCountryToList = function(country) {
  this.bucketlist.push(country);
  this.render(country);
}

BucketlistViews.prototype.render = function(country) {
  const ul = document.querySelector('#bucketlist');
  const li = document.createElement('li');
  const text = document.createElement('p');
  text.innerText = `${country.name} - ${country.capital}`;
  li.appendChild(text);
  ul.appendChild(li);
}

module.exports = BucketlistViews;
