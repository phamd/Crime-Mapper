$('body').on('click', '#getMap', function(e) {
    e.preventDefault();
    
    var coordFrom = addressToCoord($('#addressFrom').val());
    var coordTo = addressToCoord($('#addressTo').val());
    var params = {
        lat1: coordFrom.lat,
        long1: coordFrom.long,
        lat2: coordTo.lat,
        long2: coordTo.long,
        heatmap: $('#heatMap').prop('checked')
    };
    $.get('map?' + $.param(params), function(response) {
        console.log(response + "qwe");
        getMap(params.lat1, params.long1, params.lat2, params.long2, response, params.heatmap, function(){
            console.log("map done");
        });
    });
});


function addressToCoord(address) {
    
    //TODO
    var coord = {lat:43, long:-79};
    
    return coord;
}

function getMap(originLat, originLon, destLat, destLon, crimeData, heatMapToggle, cb) {

    var customIcons = {'Arrest':'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/arrest.png?1445454105',"Arson":'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/arson.png?1445454105',"Assault":'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/assault.png?1445454105',"Burglary":'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/burglary.png?1445454105',"Other":'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/other.png?1445454105',"Robbery":'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/robbery.png?1445454105', "Shooting":'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/shooting.png?1445454105', "Theft":'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/theft.png?1445454105', "Vandalism":'http://s3.mylocalcrime.com.s3.amazonaws.com/images/icons/no_shadow/vandalism.png?1445454105'};
    
    //init map			
    var map = new google.maps.Map(document.getElementById('map'), {
        //eventually change to user location
        center: {lat: 43.2500, lng: -79.8667},
        zoom: 10
    });

    //route
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer(); 

    directionsDisplay.setMap(map);

    var directionsRequest = {
        origin: new google.maps.LatLng(originLat,originLon),
        destination: new google.maps.LatLng(destLat, destLon),
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };

    directionsService.route(directionsRequest, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
    //put up custom icons for crimes	
    var markers = [];


    for(var i = 0; i < crimeData.length; i++) {
        //determine crime type for icon
        switch (crimeData[i]['type']) {
            case "Arrest" :
                var icon = customIcons['Arrest'];
                break;
            case "Arson" :
                var icon = customIcons['Arson'];
                break;
            case "Assault" :
                var icon = customIcons['Assault'];
                break;
            case "Burglary" :
                var icon = customIcons['Burglary'];
                break;
            case "Other" :
                var icon = customIcons['Other'];
                break;
            case "Robbery" :
                var icon = customIcons['Robbery'];
                break;
            case "Shooting" :
                var icon = customIcons['Shooting'];
                break;
            case "Theft" :
                var icon = customIcons['Theft'];
                break;
            case "Vandalism" :
                var icon = customIcons['Vandalism'];
                break;
            default:
                var icon = customIcons['Assault'];
                break;
        }
        markers.push(new google.maps.Marker({
            position: new google.maps.LatLng(crimeData[i]['lat'],crimeData[i]['lon']),
            map: map,
            icon:icon
        }));

    }

    //heatmap function
    function getHeatMapPoints() {
        var heatMapData = [];

        for (var i = 0; i < crimeData.length; i++) {
            heatMapData.push(new google.maps.LatLng(crimeData[i]['lat'],crimeData[i]['lon']));
        }

        return heatMapData;
    }

    if (heatMapToggle) {
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: getHeatMapPoints(),
            map: map
        });
    }
	cb(map);
}