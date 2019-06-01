var fs = require('fs');


function loadAndWriteCE(FILTERS, DESTINATION) {
    var dataset;
    dataset = fs.readFileSync('resource/CP/dataset.json');
    var CP = JSON.parse(dataset);

    for (let i = 0; i < FILTERS.length; i += 2) {

        for (let j = 0; j < CP.length; j++) {

            if (CP[j][FILTERS[i]] != FILTERS[i + 1]) {
                CP.splice(j, 1);
                j--;
            }
        }
    }

    dataset = fs.readFileSync('resource/CE/dataset.json');

    var CE = JSON.parse(dataset);

    var newDataset = new Array();

    for (let i = 0; i < CP.length; i++) {

        for (let j = 0; j < CE.length; j++) {

            if (CE[j]['CODCPSIG'] == CP[i]['CODCP']) {
                newDataset.push(CE[j]);
                CE.splice(j, 1);
                j--;
            }
        }
    }

    fs.writeFileSync(DESTINATION, JSON.stringify(newDataset), 'utf8');

}

var FILTERS = new Array();
var DESTINATION;

//CE del distrito de San Martin de Porres
/*
DESTINATION = 'resource/CE/CE_SAN-MARTIN-DE-PORRES.json';
FILTERS.push('DEP');
FILTERS.push('LIMA');
FILTERS.push('PROV');
FILTERS.push('LIMA');
FILTERS.push('DIST');
FILTERS.push('SAN MARTIN DE PORRES');
*/

/*
//CE de la región Lima
DESTINATION = 'resource/CE/CE_LIMA.json';
FILTERS.push('DEP');
FILTERS.push('LIMA');
*/

/*
//CE de la región Apurimac
DESTINATION = 'resource/CE/CE_APURIMAC.json';
FILTERS.push('DEP');
FILTERS.push('APURIMAC');
*/

loadAndWriteCE(FILTERS, DESTINATION);