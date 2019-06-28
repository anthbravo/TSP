exports.loadResources = () => {

    var resources = {};

    resources['CP_CAPITALES'] = require('./resource/CP_CAPITALES.json');
    resources['D_CP_CAPITALES'] = require('./resource/D_CP_CAPITALES.json');

    resources['CP_PROVINCIAS'] = require('./resource/CP_PROVINCIAS.json');
    resources['D_CP_PROVINCIAS'] = require('./resource/D_CP_PROVINCIAS.json');

    resources['CP_DISTRITOS'] = require('./resource/CP_DISTRITOS.json');
    resources['D_CP_DISTRITOS'] = require('./resource/D_CP_DISTRITOS.json');

    resources['CE_APURIMAC'] = require('./resource/CE_APURIMAC.json');
    resources['D_CE_APURIMAC'] = require('./resource/D_CE_APURIMAC.json');

    resources['CE_SAN-MARTIN-DE-PORRES'] = require('./resource/CE_SAN-MARTIN-DE-PORRES.json');
    resources['D_CE_SAN-MARTIN-DE-PORRES'] = require('./resource/D_CE_SAN-MARTIN-DE-PORRES.json');

    return resources;
}