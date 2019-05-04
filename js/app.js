var dataset;
var optimumTravel = [];
var maximumPermutations;
var countPermutations = 0;

function obtainDataset() {

    var urlDataset = '/resource/dataset.json';

    fetch(urlDataset)
        .then(response => response.json())
        .then(data => {
            var index = 0;
            dataset = data;
            dataset.forEach(data => {
                data.index = index;
                index++;
                data.description =
                    '<h2>Centro Poblado ' + data.MNOMCP + '</h2>' +
                    '</br>' +
                    '<strong>Departamento: </strong>' + data.DEP +
                    '</br>' +
                    '<strong>Provincia: </strong>' + data.PROV +
                    '</br>' +
                    '<strong>Distrito: </strong>' + data.DIST +
                    '</br>' +
                    '<strong>Latitud: </strong>' + data.YGD +
                    '</br>' +
                    '<strong>Longitud: </strong>' + data.XGD;
            });
            maximumPermutations = calculatePermutation(data.length - 1) / 2;
        });
}

function calculatePermutation(value) {
    if (value <= 2) {
        return value;
    } else {
        return value * calculatePermutation(value - 1);
    }
}

obtainDataset();

window.onload = function () {

    var map;

    function initializeMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: -9.4154388,
                lng: -74.1862975
            },
            zoom: 5.7
        });
    }

    function loadMarks() {

        var infoWindow = new google.maps.InfoWindow({
            content: ''
        });

        dataset.forEach(data => {
            var marker = new google.maps.Marker({
                position: {
                    lat: data.YGD,
                    lng: data.XGD
                },
                title: data.MNOMCP,
                label: data.index + '',
                map: map
            });

            google.maps.event.addListener(marker, 'mouseover', function () {

                infoWindow.close();

                infoWindow = new google.maps.InfoWindow({
                    content: data.description
                });

                infoWindow.open(map, marker);
            });

            google.maps.event.addListener(marker, 'dblclick', function () {

                infoWindow.close();

                marker.setAnimation(google.maps.Animation.BOUNCE);

                var travel = [];

                tsp(dataset, data.index, travel);

                var finalTravel = (optimumTravel[optimumTravel.length - 1].total / 1000);

                console.log('Recorrido final de ' + finalTravel + ' km');
                console.log('Puedes ver el detalle del recorrido en el arreglo');
                console.log('Distancia => recorrido en metros con respecto al punto anterior');
                console.log('Total => recorrido acumulado en metros');

                console.dir(optimumTravel);

                var flightPath = new google.maps.Polyline({
                    path: optimumTravel,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 1
                });

                flightPath.setMap(map);

                Swal.fire(
                    'El recorrido minimo es de ' + finalTravel + ' km',
                    'Aprieta F12 para ver detalle del recorrido en consola!',
                    'success'
                ).then(() => {
                    setTimeout(() => {
                        marker.setAnimation(null);
                    }, 10000);
                });

            });

        });
    }

    function tsp(dataset, index, travel) {

        let data = JSON.parse(JSON.stringify(dataset));
        let newTravel = JSON.parse(JSON.stringify(travel));

        if (countPermutations <= maximumPermutations) {

            if (data.length == 0) {

                var point = new Object();
                point.name = newTravel[0].name;
                point.lat = newTravel[0].lat;
                point.lng = newTravel[0].lng;

                if (newTravel.length > 0) {
                    point.distance =
                        google.maps.geometry.spherical.computeDistanceBetween(
                            new google.maps.LatLng(point.lat, point.lng),
                            new google.maps.LatLng(newTravel[newTravel.length - 1].lat, newTravel[newTravel.length - 1].lng));
                    point.total = newTravel[newTravel.length - 1].total + point.distance;
                }

                newTravel.push(point);

                if (optimumTravel.length == 0) {
                    optimumTravel = newTravel;
                } else if (newTravel[newTravel.length - 1].total <
                    optimumTravel[optimumTravel.length - 1].total) {
                    optimumTravel = newTravel;
                }

                countPermutations++;

            } else {

                var point = new Object();
                point.name = data[index].MNOMCP;
                point.lat = data[index].YGD;
                point.lng = data[index].XGD;

                if (newTravel.length == 0) {
                    point.distance = 0;
                    point.total = 0;
                } else {
                    point.distance =
                        google.maps.geometry.spherical.computeDistanceBetween(
                            new google.maps.LatLng(data[index].YGD, data[index].XGD),
                            new google.maps.LatLng(newTravel[newTravel.length - 1].lat, newTravel[newTravel.length - 1].lng));
                    point.total = newTravel[newTravel.length - 1].total + point.distance;
                }
                data.splice(index, 1);
                newTravel.push(point);

                if (data.length == 0) {
                    tsp(data, -1, newTravel);
                } else {
                    for (let i = 0; i < data.length; i++) {
                        tsp(data, i, newTravel);
                    }

                }

            }

        }

    }

    initializeMap();
    loadMarks();




}