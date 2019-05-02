var dataset;

function obtainDataset() {

    var urlDataset = '/resource/dataset.json';

    fetch(urlDataset)
        .then(response => response.json())
        .then(data => {
            var codigo = 0;
            console.log(codigo);
            dataset = data;
            dataset.forEach(data => {
                data.title = 'Departamento: ' +
                    data.DEP +
                    ' | Provincia: ' +
                    data.PROV +
                    ' | Distrito: ' +
                    data.DIST +
                    ' | Centro Poblado: ' +
                    data.MNOMCP;
                data.label = codigo;

                codigo++;
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
        dataset.forEach(data => {
            new google.maps.Marker({
                position: {
                    lat: data.YGD,
                    lng: data.XGD
                },
                title: data.title,
                label: data.label + '',
                map: map
            });
        });
    }

    initializeMap();
    loadMarks();




}