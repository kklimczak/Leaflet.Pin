describe('Leaflet.Pin', function () {

    var map;

    beforeEach(function () {
        map = new L.Map(L.DomUtil.create('div'), {pin: true});
    });

    describe('#add and parse guide layers', function () {
        var featureGroup;

        beforeEach(function () {
            featureGroup = new L.FeatureGroup();
            featureGroup.addLayer(new L.Marker([50.0, 50.0]));
            featureGroup.addLayer(new L.Marker([50.0, 50.1]));
            featureGroup.addLayer(new L.Marker([50.0, 50.2]));
            map.addGuideLayer(featureGroup);
            map.addGuideLayer(new L.Marker([50.0, 50.3]));
        });

        it('correctly added guide layers to global container', function () {
            expect(map._guides.length).toBe(2);
        });

        it('correctly parse guide layers', function () {

            var pin = new L.Handler.MarkerPin(map);
            pin.enable(new L.Marker([50.0, 50.3]));
            expect(pin._guideList.length).toBe(4);
        });
    });
});