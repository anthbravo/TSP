var urlDataset = '/resource/dataset.json';

fetch(urlDataset)
    .then(response => response.json())
    .then(data => {

        console.log(data);

    });