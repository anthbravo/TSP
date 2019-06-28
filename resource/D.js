var fs = require('fs');
var geo = require('geopoint');


function generateDistancesCP(INPUT, OUTPUT) {
    var dataset = fs.readFileSync(INPUT);

    CP = JSON.parse(dataset);

    var D = {};
    var distance;

    for (let i = 0; i < CP.length; i++) {

        for (let j = i + 1; j < CP.length; j++) {
            distance = new geo(CP[i]['lat'], CP[i]['lng']).distanceTo(new geo(CP[j]['lat'], CP[j]['lng']), true);
            D[CP[i]['code'] + '-' + CP[j]['code']] = distance;
            D[CP[j]['code'] + '-' + CP[i]['code']] = distance;
        }
    }

    fs.writeFileSync(OUTPUT, JSON.stringify(D), 'utf8');

}

function generateDistancesCE(INPUT, OUTPUT) {
    var dataset = fs.readFileSync(INPUT);

    CE = JSON.parse(dataset);

    var D = {};
    var distance;

    for (let i = 0; i < CE.length; i++) {

        for (let j = i + 1; j < CE.length; j++) {
            distance = new geo(CE[i]['lat'], CE[i]['lng']).distanceTo(new geo(CE[j]['lat'], CE[j]['lng']), true);
            D[CE[i]['code'] + '-' + CE[j]['code']] = distance;
            D[CE[j]['code'] + '-' + CE[i]['code']] = distance;
        }

    }

    fs.writeFileSync(OUTPUT, JSON.stringify(D), 'utf8');
}

//generateDistancesCP('resource/CP/CP_CAPITALES.json', 'resource/CP/D_CP_CAPITALES.json');
//generateDistancesCP('resource/CP/CP_DISTRITOS.json', 'resource/CP/D_CP_DISTRITOS.json');
//generateDistancesCP('resource/CP/CP_PROVINCIAS.json', 'resource/CP/D_CP_PROVINCIAS.json');

generateDistancesCE('resource/CE/CE_LIMA.json','resource/CE/D_CE_LIMA.json');
//generateDistancesCE('resource/CE/CE_SAN-MARTIN-DE-PORRES.json','resource/CE/D_CE_SAN-MARTIN-DE-PORRES.json');
//generateDistancesCE('resource/CE/CE_APURIMAC.json','resource/CE/D_CE_APURIMAC.json');