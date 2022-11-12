
var map = L.map('map', {attributionControl: false});
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();
map.boxZoom.disable();
map.keyboard.disable();
map.dragging.disable();
$(".leaflet-control-zoom").css("visibility", "hidden");

let countryLayer = L.geoJSON(countries, {
    style: styleCountry,
    onEachFeature: onEachCountries,
}).addTo(map);
map.fitBounds(countryLayer.getBounds());

let lines = new L.featureGroup();

let drawLines = function(clist){
    let slatlng=[clist[0].s_lat,clist[0].s_lon];

    for(i=0;i<clist.length;i++){
        let dlatlng=[clist[i].d_lat, clist[i].d_lon];
        var latlngs = [slatlng, dlatlng];
        L.polyline(latlngs, {color: '#F89828'}).addTo(lines);
    }

    lines.addTo(map);
}