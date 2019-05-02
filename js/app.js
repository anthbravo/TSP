var dataset;

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
        });
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

                console.log(data.index);
            });

        });
    }

    initializeMap();
    loadMarks();




}