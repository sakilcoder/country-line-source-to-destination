function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
        // fillOpacity: 1,
        fillColor: '#0d253e',
        // color: "#add8e6",
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
        euLayer.bringToFront();
        let sid = parseInt(feature.properties.id);
        let clist = _.where(relations, { source_id: sid });
        if(clist.length>0){
            highlightFeature(e);
            drawLines(clist);
            let scname = document.getElementsByClassName("source cname")[0];
            scname.innerHTML='<div style="width: 100%; border-bottom: 1px solid black">From</div>' + feature.properties.country;
            
            dcname='<div style="width: 100%; border-bottom: 1px solid black">To</div>';
            for(i=0;i<clist.length;i++){
                dcname += clist[i].destination_country + "<br>"
            }
            document.getElementsByClassName("destination cname")[0].innerHTML=dcname;
        }
        
    });

    layer.on('mouseout', function (e) {
        resetHighlight(e);
        lines.eachLayer(function(el) {
            map.removeLayer(el);
        });
        document.getElementsByClassName("source cname")[0].innerHTML='';
        document.getElementsByClassName("destination cname")[0].innerHTML='';
        euLayer.bringToFront();
    });

}
