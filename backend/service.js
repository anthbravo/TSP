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

exports.cartesian = (req, res, test) => {
    console.log(test);
    var service;

    req.on('data', data => {
        service = JSON.parse(data);
    });

    req.on('end', () => {
        console.log(service);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(service));
    });

}

exports.combinatorial = (req, res, test) => {
    console.log(test);
    var service;

    req.on('data', data => {
        service = JSON.parse(data);
    });

    req.on('end', () => {
        console.log(service);

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(service));
    });

}