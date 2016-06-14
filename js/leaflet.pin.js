(function() {
L.Handler.MarkerPin = L.Handler.extend({
  options: {
    distance: 20,
    vertices: true
  },

  initialize: function(map, marker, options) {
    L.Handler.prototype.initialize.call(this, map);
    L.Util.setOptions(this, options || {});
  },

  enable: function (marker) {
    console.log('enable');
    if (marker) {
      this._observeMarker(marker);
    }
  },

  disable: function () {
    console.log('disable');
    this._unobserveMarker();
  },

  _observeMarker: function (marker) {
    console.log('observeMarker');
    marker.on('move', this._updateLatLng, this);
  },

  _unobserveMarker: function () {
    console.log('unobserveMarker');
    marker.off('move', this._updateLatLng, this);
  },

  _updateLatLng: function (e) {
    var marker = e.target;

    console.log(e.target);
    console.log(this.options);

    marker.setIcon(marker.options.icon);
    marker.setOpacity(1);
    L.DomUtil.addClass(marker._icon, 'leaflet-marker-icon leaflet-div-icon leaflet-editing-icon leaflet-pin-marker');
    var latlng = marker.getLatLng();
    this._closest = this._findClosestMarker(this._map, [L.polyline([[51,0],[51,1]])], latlng, this.options.distance, this.options.vertices);
    if (this._closest != null) {
      marker._latlng = this._closest.latlng;
      marker.update();
    }
  },

  _findClosestMarker: function (map, layers, latlng, distance, vertices) {
    return L.GeometryUtil.closestLayerSnap(map, layers, latlng, distance, vertices);
  }

});

L.Draw.Feature.Pin = {
  _pin_initialize: function () {
    console.log('_pin_initialize');
    this.on('enabled', this._pin_on_enabled, this);
    this.on('disabled', this._pin_on_disabled, this);
  },

  _pin_on_enabled: function () {
    console.log('_pin_on_enabled');
    var marker = this._mouseMarker;
    if (!this.pinning) {
      this._pinning = new L.Handler.MarkerPin(this._map);
    }

    if (this.options.vertices) {
      this._pinning.options.vertices = this.options.vertices;
    }
    if (this.options.distance) {
      this._pinning.options.distance = this.options.distance;
    }
    this._pinning.enable(marker);


    marker.on('click', this._pin_on_click, this);
  },

  _pin_on_click: function (e) {
      if (this._markers) {
        var markerAmount = this._markers.length,
        marker = this._markers[markerAmount-1];
        if (e) {
          marker.setLatLng(e.target._latlng);
          if (this._poly) {
            var polyPointsAmount = this._poly._latlngs.length;
            this._poly._latlngs[polyPointsAmount - 1] = e.target._latlng;
            this._poly.redraw();
          }
        }
      }
  },

  _pin_on_disabled: function () {
    console.log('_pin_on_disabled');
    delete this._pinning;
  }
};

L.Edit.Marker.Pin = {
  _pin_initialize: function () {
    console.log('_pin_edit_initialize');
    this._marker.on('dragstart', this._pin_on_dragstart, this);
    this._marker.on('dragend', this._pin_on_dragend, this);
  },

  _pin_on_dragstart: function (e) {
    if (this._marker._pinning) {
      this._marker._pinning = new L.Handler.MarkerPin(this._marker._map);
    }
    this._marker._pinning.enable(this._marker);
  },

  _pin_on_dragend: function (e) {
    this._marker._pinning.disable(this._marker);
  }
}

L.Edit.Marker.include(L.Edit.Marker.Pin);
L.Edit.Marker.addInitHook('_pin_initialize');

L.Draw.Feature.include(L.Draw.Feature.Pin);
L.Draw.Feature.addInitHook('_pin_initialize');
})()
