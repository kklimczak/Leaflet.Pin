(function () {
    L.Handler.MarkerPin = L.Handler.extend({
        options: {
            distance: 20,
            vertices: true
        },

        initialize: function (map, marker, options) {
            L.Handler.prototype.initialize.call(this, map);
            L.Util.setOptions(this, options || {});
        },

        enable: function (marker) {
            if (marker && this._map.options.pin) {
                this._observeMarker(marker);
                this._currentMarker = marker;
            }
        },

        disable: function () {
            if (this._map.options.pin) {
                this._unobserveMarker();
            }
        },

        _observeMarker: function (marker) {
            marker.on('move', this._updateLatLng, this);

            var guideList = [];

            function parseGuideLayers(layer) {
                if (layer._layers !== undefined) {
                    for (var guide in layer._layers) {
                        if (layer._layers.hasOwnProperty(guide)) {
                            parseGuideLayers(layer._layers[guide]);
                        }
                    }
                } else {
                    guideList.push(_.cloneDeep(layer));
                }
            }



            for (var i = 0; i < this._map._guides.length; i++) {
                var guide = this._map._guides[i];
                parseGuideLayers(guide);
            }

            this._guideList = guideList;
        },

        _unobserveMarker: function () {
            this._currentMarker.off('move', this._updateLatLng, this);
        },

        _updateLatLng: function (e) {
            var marker = e.target;

            marker.setOpacity(1);
            L.DomUtil.addClass(marker._icon, 'leaflet-marker-icon leaflet-div-icon leaflet-editing-icon leaflet-pin-marker');
            var latlng = marker.getLatLng();
            this._closest = this._findClosestMarker(this._map, this._guideList, latlng, this.options.distance, this.options.vertices);
            if (this._closest != null) {
                marker._latlng = this._closest.latlng;
                marker.update();
            }
        },

        _findClosestMarker: function (map, guideList, latlng, distance, vertices) {
            return L.GeometryUtil.closestLayerSnap(map, guideList, latlng, distance, vertices);
        }

    });

    L.Map.Pin = {
        _pin_initialize: function () {
            this._guides = [];
            for (var i = 0; i < this.options.guideLayers.length; i++) {
                this.addGuideLayer(this.options.guideLayers[i]);
            }

            if (this.options.pinControl) {
                this.addControl(new L.Control.Pin());
            }
        },

        togglePin: function () {
            this.options.pin = !this.options.pin;
        },

        addGuideLayer: function (layer) {
            this._guides.push(layer);
        }
    };

    L.Map.include(L.Map.Pin);
    L.Map.addInitHook('_pin_initialize');

    L.Map.mergeOptions({
        pin: false,
        pinControl: true,
        guideLayers: []
    });

    L.Draw.Feature.Pin = {
        _pin_initialize: function () {
            this.on('enabled', this._pin_on_enabled, this);
            this.on('disabled', this._pin_on_disabled, this);
        },

        _pin_on_enabled: function () {
            var marker = this._mouseMarker;
            if (!this._pinning) {
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
                    marker = this._markers[markerAmount - 1];
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
            delete this._pinning;
        }
    };

    L.Edit.Marker.Pin = {
        _pin_initialize: function () {
            this._marker.on('dragstart', this._pin_on_dragstart, this);
            this._marker.on('dragend', this._pin_on_dragend, this);
        },

        _pin_on_dragstart: function (e) {
            if (!this._marker._pinning) {
                this._marker._pinning = new L.Handler.MarkerPin(this._marker._map);
            }
            this._marker._pinning.enable(this._marker);
        },

        _pin_on_dragend: function (e) {
            this._marker._pinning.disable(this._marker);
        }
    };

    L.Edit.Marker.include(L.Edit.Marker.Pin);
    L.Edit.Marker.addInitHook('_pin_initialize');

    L.Draw.Feature.include(L.Draw.Feature.Pin);
    L.Draw.Feature.addInitHook('_pin_initialize');

    L.Control.Pin = L.Control.extend({
        options: {
            position: 'topleft'
        },

        onAdd: function (map) {
            this._container = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-pin');
            this._createButton();
            this._updateButton();
            return this._container;
        },

        _createButton: function () {
            var button = L.DomUtil.create('a', '', this._container);
            L.DomEvent.on(button, 'click', this._togglePin, this);
        },

        _togglePin: function () {
            this._map.togglePin();
            this._updateButton();
        },

        _updateButton: function () {
            var className = 'leaflet-control-pin-enabled';
            if (this._map.options.pin) {
                L.DomUtil.addClass(this._container, className);
            } else {
                L.DomUtil.removeClass(this._container, className);
            }
        }
    });
})();
