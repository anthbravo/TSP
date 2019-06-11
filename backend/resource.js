exports.loadResources = () => {

    var resources = {};

    resources['CP_CAPITALES'] = require('./resource/CP_CAPITALES.json');
    resources['D_CP_CAPITALES'] = require('./resource/D_CP_CAPITALES.json');

    return resources;
}