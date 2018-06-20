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
