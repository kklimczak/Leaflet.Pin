var map = L.map('map');

var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
var osmAttrib='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 12, attribution: osmAttrib});

map.setView(new L.LatLng(51.3, 0.7),8);
map.addLayer(osm);

var gridLayer = new L.FeatureGroup();
//map.addLayer(gridLayer);

for(var i = -1; i < 2.5; i=i + 0.25) {
  for(var j = 50.5; j < 52.1; j=j + 0.125) {
    L.circle([j, i], 1).addTo(gridLayer);
  }
}

var circleLayer = new L.FeatureGroup();
map.addLayer(circleLayer);

for(var i = -1; i < 2.5; i=i + 0.35) {
  for(var j = 50.5; j < 52.1; j=j + 0.125) {
    L.circle([j, i], 1).addTo(circleLayer);
  }
}

var drawnItems = new L.FeatureGroup();
map.addLayer(drawnItems);

var snapLayer = new L.FeatureGroup();
map.addLayer(snapLayer);

var guideLayers = [
  gridLayer
];

var drawControl = new L.Control.Draw({
  draw: {
    polyline: {},
    polygon: {},
    marker: {},
    rectangle: false,
    circle: false
  },
  edit: {
    featureGroup: drawnItems
  }
});

L.geoJson(loadJson(), {
  onEachFeature: function (feature, layer) {
    if(feature.geometry.type == "LineString") {
      layer.setStyle({
        color: 'purple',
        weight: 5
      });
    } else if (feature.geometry.type == "Polygon") {
      drawnItems.addLayer(layer);
    }
  }
});


map.addControl(drawControl);

map.on('draw:created', function (e) {
  var layer = e.layer;
  //layer.pin = L.Handler.MarkerPin(map, layer);
  drawnItems.addLayer(layer);
});


map.on('mousemove', function (e) {
  //console.log(e.latlng);
})
