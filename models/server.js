const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.puerto = process.env.PORT;// Utilizamos la variable de entorno del puerto
        this.usuariosPath = '/api/usuarios'; // Declaramos una variable para indicar donde tenemos nuestas rutas

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicacion 
        this.routes();
    }

    async conectarDB(){
        await dbConnection()
    }

    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.puerto, () => {
            console.log(`Servidor Ejecutandose Correctamente en el puerto ${this.puerto}`);
        });
    }
}

module.exports = Server;