exports.sampleRequest = (req, res) => {

    var response = {
        "text": "Hello World"
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

exports.badURL = (req, res) => {

    var response = `<h1>Error 404 Bad Request</h1>`;

    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/html');
    res.end(response);
};

exports.slope = (data, response, resources) => {

    var start = new Date().getTime();

    var dataset;
    var distances;

    if (data['service'] == 1) {
        if (data['option'] == 1) {
            dataset = new Array().concat(resources['CP_CAPITALES']);
            distances = new Object(resources['D_CP_CAPITALES']);
        }
    }

    var bottomPoint = dataset[0];
    var upperPoint = dataset[dataset.length - 1];
    var slope = (upperPoint['lat'] - bottomPoint['lat']) / (upperPoint['long'] - bottomPoint['long']);
    var constant = upperPoint['lat'] - (slope * upperPoint['long'])

    var upperSolution = new Array();
    var bottomSolution = new Array();

    for (var i = 0; i < dataset.length; i++) {
        classification = slope * dataset[i]['long'] + constant;
        if (i == 0) {
            upperSolution.push(dataset[i]);
        } else if (i == dataset.length - 1) {
            bottomSolution.unshift(dataset[i]);
        } else {
            if (dataset[i]['lat'] >= classification) {
                upperSolution.push(dataset[i]);
            } else {
                bottomSolution.unshift(dataset[i]);
            }
        }
    }

    var solution = upperSolution.concat(bottomSolution);

    var end = new Date().getTime();

    var distance = 0;

    for (var i = 0; i < solution.length; i++) {
        if (i == 0) {
            distance += distances[solution[i]['code'] + '-' + solution[solution.length - 1]['code']];
            if (solution.length == 2) {
                break;
            }
        } else {
            distance += distances[solution[i - 1]['code'] + '-' + solution[i]['code']];
        }
    }

    response['time'] = end - start;
    response['distance'] = distance;
    response['points'] = solution;

}

exports.combinatorial = (data, response, resources) => {

}