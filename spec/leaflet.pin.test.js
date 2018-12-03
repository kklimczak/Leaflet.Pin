describe('Leaflet.Pin', function () {

    var map;

    beforeEach(function () {
        map = new L.Map(L.DomUtil.create('div'), {
            pin: true,
            pinControl: true
        });
    });

    describe('#add and parse guide layers', function () {
        var featureGroup;
        var marker;
        var poly;

        beforeEach(function () {
            poly = new L.polyline([[50.1, 50,2], [50.1, 50.6]]);
            featureGroup = new L.FeatureGroup();
            featureGroup.addLayer(new L.Marker([50.0, 50.0]));
            featureGroup.addLayer(new L.Marker([50.0, 50.1]));
            featureGroup.addLayer(new L.Marker([50.0, 50.2]));
            map.addGuideLayer(featureGroup);
            marker = new L.Marker([50.0, 50.3]);
            map.addLayer(marker);
            map.addGuideLayer(marker);
        });

        it('correctly parse guide layers', function () {
            expect(map._guideList.length).toEqual(4);
        });

        it('update guide layer for marker', function () {
            var latlng;
            map.updateGuideLayer(marker._leaflet_id, L.latLng(50.1, 50.5));
            for (var i = 0; i < map._guideList.length; i++) {
                if (map._guideList[i]._leaflet_id == marker._leaflet_id) {
                    latlng = map._guideList[i].getLatLng();
                    break;
                }
            }
            expect(latlng.equals(L.latLng(50.1, 50.5))).toBeTruthy();
        });

        it('update guide layer for poly', function () {
            var latlngs,
                newLatLngs = [L.latLng(50.1, 51.2), L.latLng(50.1, 51.6)],
                poly = new L.polyline([[50.1, 50,2], [50.1, 50.6]]),
                equals = false;

            map.addLayer(poly);
            map.addGuideLayer(poly);

            map.updateGuideLayer(poly._leaflet_id, newLatLngs);

            for (var i = 0; i < map._guideList.length; i++) {
                if (map._guideList[i]._leaflet_id == poly._leaflet_id) {
                    latlngs = map._guideList[i].getLatLngs();
                    break;
                }
            }

            for (var j = 0; j < latlngs.length; j++) {
                if (latlngs[j].equals(newLatLngs[j])) {
                    equals = true;
                }
            }

            expect(equals).toBeTruthy();
        });


        it('add layer to FeatureGroup guide layer', function () {
            featureGroup.addLayer(poly);

            expect(map._guideList.length).toEqual(5);
        });

        it('remove layer from FeatureGroup guide layer', function () {
            featureGroup.addLayer(poly);
            featureGroup.removeLayer(poly);

            expect(map._guideList.length).toEqual(4);
        });

        it("remove marker from guideList", function () {
            map.deleteGuideLayers(marker);

            expect(map._guideList.indexOf(marker) == -1);
        });

        it("remove poly from guideList", function() {
            featureGroup.addLayer(poly);
            map.deleteGuideLayers(poly);
            expect(map._guideList.indexOf(poly) == -1);
        })
    });
});
