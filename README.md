# Leaflet.Pin

#### General ##

Enable attaching of markers to other layers during draw or edit features with **Leaflet.Draw**.
Checkout demo.

#### Dependencies ##

It depends on [Leaflet.GeometryUtil](https://github.com/makinacorpus/Leaflet.GeometryUtil) and [Leaflet.Draw](https://github.com/Leaflet/Leaflet.draw).
Plugin also required [Lodash](https://github.com/lodash/lodash) (Full).

## Usage ##

Add `leaflet.draw.js`, `leaflet.geomtryutil.js`, `leaflet.pin.js` and `lodash.js`.

#### Configuration

Add to your map options properties:

**General options**
```
var map = L.map('map', {
  pin: true,
  pinControl: true,
  guideLayers: []
});
```
| Option | Type | Default | Description |
|---|---|---|---|
| pin | Boolean | false | Enable pin on map.|
| pinControl | Boolean | false | Enable Pin Control to toggle pin. |
| guideLayers | Array | [] | Array containing guide layers. You can include single layer like L.Marker or layerGroup/FeatureGroup.
**Feature option**
```
var drawControl = new L.Control.Draw({
  draw: {
    polyline: {
      distance: 20
      vertices: true
    },
    polygon: {
      distance: 25
    },
    marker: {
      distance: 25
    },
    rectangle: false,
    circle: false
  }
}
```
For each feature (rectangle and circle not supported yet):

| Option | Type | Default | Description |
|---|---|---|---|
| distance | Number | 20 | Distance in pixels where pin occurd |
| vertices | Boolean | true | Whether layers vertices add additional pin attraction. |


#### Map methods

| Method | Params | Description |
|---|---|---|
| addGuideLayer | ILayer or layerGroup | add new layer or layerGroup as guide layer/-s. |
| togglePin | - | switch on/off pin |

This plugin based on [Leaflet.Snap](https://github.com/makinacorpus/Leaflet.Snap).