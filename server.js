const port = process.env.PORT || 5000;

const server = require('./controller.js');

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});