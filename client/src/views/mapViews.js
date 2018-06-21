const MapWrapper = function(element, coords, zoom) {
 const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
 this.map = L.map(element)
   .addLayer(osmLayer)
   .setView(coords, zoom);
 this.map.on("click", function(event) {
   this.addMarker(event.latlng);
 }.bind(this))

}

MapWrapper.prototype.addMarker = function (coords) {
 L.marker(coords).addTo(this.map);
};

MapWrapper.prototype.moveMap = function (coords) {
 this.map.flyTo(coords, 12);
};

MapWrapper.prototype.addInfoWindow = function () {
 const myMarker = new L.marker(coords, {
   title: "Heart Of Singapore"
 }).bindPopup(`<a href="https://en.wikipedia.org/wiki/Singapore">Singapore</a>`).openPopup();
 myMarker.addTo(this.map);
};
