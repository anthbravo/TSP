var fs = require('fs');
var geo = require('geopoint');


function generateDistancesCP(INPUT, OUTPUT) {
    var dataset = fs.readFileSync(INPUT);

    CP = JSON.parse(dataset);

    var D = {};
    var distance;

    for (let i = 0; i < CP.length; i++) {

        for (let j = i + 1; j < CP.length; j++) {
            distance = new geo(CP[i]['YGD'], CP[i]['XGD']).distanceTo(new geo(CP[j]['YGD'], CP[j]['XGD']), true);
            D[CP[i]['CODCP'] + '-' + CP[j]['CODCP']] = distance;
            D[CP[j]['CODCP'] + '-' + CP[i]['CODCP']] = distance;
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
            distance = new geo(CE[i]['Y_LATITUD'], CE[i]['X_LONGITUD']).distanceTo(new geo(CE[j]['Y_LATITUD'], CE[j]['X_LONGITUD']), true);
            D[CE[i]['CODLOCAL'] + '-' + CE[j]['CODLOCAL']] = distance;
            D[CE[j]['CODLOCAL'] + '-' + CE[i]['CODLOCAL']] = distance;
        }

    }

    fs.writeFileSync(OUTPUT, JSON.stringify(D), 'utf8');
}

// generateDistancesCP('resource/CP/CP_CAPITALES.json', 'resource/CP/D_CP_CAPITALES.json');
// generateDistancesCP('resource/CP/CP_DISTRITOS.json', 'resource/CP/D_CP_DISTRITOS.json');
// generateDistancesCP('resource/CP/CP_PROVINCIAS.json', 'resource/CP/D_CP_PROVINCIAS.json');

//generateDistancesCE('resource/CE/CE_LIMA.json','resource/CE/D_CE_LIMA.json');
// generateDistancesCE('resource/CE/CE_SAN-MARTIN-DE-PORRES.json','resource/CE/D_CE_SAN-MARTIN-DE-PORRES.json');
// generateDistancesCE('resource/CE/CE_APURIMAC.json','resource/CE/D_CE_APURIMAC.json');