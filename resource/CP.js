var fs = require('fs');

function loadAndWriteCP(INPUT, OUTPUT, CAPITAL_CODE) {

    var dataset = fs.readFileSync(INPUT);
    var newDataset = new Array();

    centrosPoblados = JSON.parse(dataset);

    centrosPoblados.forEach(CP => {

        if (CP.CAPITAL == CAPITAL_CODE) {
            var centroPoblado = {};

            centroPoblado['code'] = CP.CODCP;
            centroPoblado['name'] = CP.NOMCP;
            centroPoblado['lat'] = CP.YGD;
            centroPoblado['long'] = CP.XGD;

            newDataset.push(centroPoblado);
        }

    });

    newDataset.sort((a, b) => {
        return a['lat'] - b[['lat']];
    });

    fs.writeFileSync(OUTPUT, JSON.stringify(newDataset), 'utf8');
}

/**
 * 0 RESTANTES
 * 1 CAPITALES
 * 2 PROVINCIAS
 * 3 DISTRITOS
 */
var INPUT = 'resource/CP/dataset.json';
var OUTPUT = 'resource/CP/CP_CAPITALES.json';
var CAPITAL_CODE = '1';
loadAndWriteCP(INPUT, OUTPUT, CAPITAL_CODE);