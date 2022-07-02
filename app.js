require('dotenv').config();

const Server = require('./models/server'); // Importamos la clase 

const server = new Server();

server.listen();



