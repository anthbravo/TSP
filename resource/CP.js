var fs = require('fs');


function loadAndWriteCP(CAPITAL_CODE){
    var dataset = fs.readFileSync('resource/CP/dataset.json');
    var newDataset = new Array();

    centroPoblado = JSON.parse(dataset);

    centroPoblado.forEach(CP => {

        if(CP.CAPITAL == CAPITAL_CODE){
            newDataset.push(CP);
        }
        
    });

    fs.writeFileSync('resource/CP/CP_DISTRITOS.json', JSON.stringify(newDataset), 'utf8');
}
/**
 * 0 RESTANTES
 * 1 CAPITALES
 * 2 PROVINCIAS
 * 3 DISTRITOS
 */
loadAndWriteCP("3");