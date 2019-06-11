const http = require('http');
const url = require('url');

const resources = require('./resource').loadResources();

module.exports = http.createServer((req, res) => {
    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    if (reqUrl.pathname == '/calculate' && req.method === 'POST') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        var response = {};

        req.on('data', data => {
            jsonData = JSON.parse(data);

            if (jsonData['algorithm'] == 1) {
                service.slope(jsonData, response, resources);
            } else if (jsonData['algorithm'] == 2) {
                service.combinatorial(jsonData, response, resources);
            }
        });

        req.on('end', () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(response));
        });


    } else if (reqUrl.pathname == '/' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.sampleRequest(req, res);
    } else {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.badURL(req, res);
    }
});