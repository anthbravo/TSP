function showOrHideElement(id, work) {
    var element = document.getElementById(id);
    if (work == 1) {
        element.style.display = '';
    } else {
        element.style.display = 'none';
    }
}

function showOptions(value) {
    if (value == 1) {
        showOrHideElement('divOptions', 1);
        showOrHideElement('selectCentroPoblado', 1);
        showOrHideElement('selectCentroEducativo', 0);
    } else if (value == 2) {
        showOrHideElement('divOptions', 1);
        showOrHideElement('selectCentroPoblado', 0);
        showOrHideElement('selectCentroEducativo', 1);
    }

}

function process(algorithm, service) {

    showOrHideElement('divAlgorithm', 0);
    showOrHideElement('divService', 0);
    showOrHideElement('divOptions', 0);
    showOrHideElement('divProcess', 0);
    showOrHideElement('divLoader', 1);

    var process = {};

    process['service'] = service;

    if (service == 1) {
        process['option'] = document.getElementById('selectCentroPoblado').value;
    } else if (service == 2) {
        process['option'] = document.getElementById('selectCentroEducativo').value;
    }

    var processSend = JSON.stringify(process);

    //Crear metodo que pueda enviar el json Y procesar la respuesta mostrandolo en el map
    console.log(processSend);
    if (algorithm == 1) {
        
    } else if (algorithm == 2) {

    }


}