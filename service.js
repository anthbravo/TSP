const url = require('url');

exports.sampleRequest = function (req, res) {

    var response = {
        "text": "Hello World"
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(response));
};

exports.badURL = function (req, res) {

    var response = `<h1>Error 404 Bad Request</h1>`;

    res.statusCode = 400;
    res.setHeader('Content-Type', 'text/html');
    res.end(response);
};