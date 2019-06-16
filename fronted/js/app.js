var map;

function initializeMap() {
    map = new google.maps.Map(document.getElementById('divMap'), {
        center: {
            lat: -9.4154388,
            lng: -74.1862975
        },
        zoom: 5.7
    });
}

function loadMarks(data) {

    var infoWindow = new google.maps.InfoWindow({
        content: ''
    });

    var index = 0;

    data['points'].forEach(point => {
        var marker = new google.maps.Marker({
            position: {
                lat: point.lat,
                lng: point.lng
            },
            title: point.name,
            label: ++index + '',
            map: map
        });

        google.maps.event.addListener(marker, 'mouseover', function () {

            infoWindow.close();

            infoWindow = new google.maps.InfoWindow({
                content: point.name
            });

            infoWindow.open(map, marker);
        });
    });
}

function generateLines(data){
    var points = new Array().concat(data['points']);
    points.push(points[0]);

    var flightPath = new google.maps.Polyline({
                    path: points,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 1
                });

    flightPath.setMap(map);
}

function showMap(data) {
    initializeMap();
    loadMarks(data);
    generateLines(data);
}