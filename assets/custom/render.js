function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        // fillOpacity: 1,
        fillColor: '#daaf38'
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

}

function resetHighlight(e) {
    countryLayer.resetStyle(e.target);
}



function onEachCountries(feature, layer) {

    // layer.on({
    //     mouseover: highlightFeature,
    //     mouseout: resetHighlight,
    // });

    // feature.properties.plot_no

    layer.on('mouseover', function (e) {

        let sid = parseInt(feature.properties.id);
        let clist = _.where(relations, { source_id: sid });
        if(clist.length>0){
            highlightFeature(e);
            drawLines(clist);
        }
    });

    layer.on('mouseout', function (e) {
        resetHighlight(e);
        lines.eachLayer(function(el) {
            map.removeLayer(el);
        });
    });

}
