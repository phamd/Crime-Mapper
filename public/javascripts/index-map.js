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
        console.log(response);
    });
});


function addressToCoord(address) {
    
    //TODO
    var coord = {lat:0, long:0};
    
    return coord;
}