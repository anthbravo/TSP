function showOrHideElement(id, work) {
    var element = document.getElementById(id);
    if (work == 1) {
        element.style.display = 'block';
    } else {
        element.style.display = 'none';
    }
}

function showOptions(value) {
    if (value == 0) {
        showOrHideElement('divOptions', 0);
    } else if (value == 1) {
        showOrHideElement('divOptions', 1);
        showOrHideElement('selectCentroPoblado', 1);
        showOrHideElement('selectCentroEducativo', 0);
    } else if (value == 2) {
        showOrHideElement('divOptions', 1);
        showOrHideElement('selectCentroPoblado', 0);
        showOrHideElement('selectCentroEducativo', 1);
    }

}