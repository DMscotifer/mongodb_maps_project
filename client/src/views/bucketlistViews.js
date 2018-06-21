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
