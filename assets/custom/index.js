
var map = L.map('map', { attributionControl: false });
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.dragging.disable();
$(".leaflet-control-zoom").css("visibility", "hidden");

let euLayer = L.geoJSON(europe, {
    style: styleCountry,
    interactive: false,
});

let countryLayer = L.geoJSON(countries, {
    style: styleCountry,
    onEachFeature: onEachCountries,
}).addTo(map);
map.fitBounds(countryLayer.getBounds());

euLayer.addTo(map);

let lines = new L.featureGroup();

let drawLines = function (clist) {

    var latlngs = [];
    let latlng1 = [clist[0].s_lat, clist[0].s_lon];

    for (i = 0; i < clist.length; i++) {
        var latlng2 = [clist[i].d_lat, clist[i].d_lon];

        var offsetX = latlng2[1] - latlng1[1],
            offsetY = latlng2[0] - latlng1[0];

        var r = Math.sqrt(Math.pow(offsetX, 2) + Math.pow(offsetY, 2)),
            theta = Math.atan2(offsetY, offsetX);

        var thetaOffset = (3.14 / 10);

        var r2 = (r / 2) / (Math.cos(thetaOffset)),
            theta2 = theta + thetaOffset;

        var midpointX = (r2 * Math.cos(theta2)) + latlng1[1],
            midpointY = (r2 * Math.sin(theta2)) + latlng1[0];

        var midpointLatLng = [midpointY, midpointX];

        latlngs.push(latlng1, midpointLatLng, latlng2);

        var pathOptions = {
            color: '#F89828',
            weight: 3
        }

        L.curve(
            [
                'M', latlng1,
                'Q', midpointLatLng,
                latlng2
            ], pathOptions).addTo(lines);
        
            // let dlatlng=[clist[i].d_lat, clist[i].d_lon];
        // var latlngs = [slatlng, dlatlng];
        // L.polyline(latlngs, {color: '#F89828', weight: 3}).addTo(lines);
    }

    lines.addTo(map);
}

const info = L.control({position: 'bottomleft'});
info.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'source cname');
    return div;
};
info.addTo(map);

const dinfo = L.control({position: 'bottomright'});
dinfo.onAdd = function (map) {

    const div = L.DomUtil.create('div', 'destination cname');
    return div;
};
dinfo.addTo(map);