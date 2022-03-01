const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const path = require('path');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.path = {
            auth      : '/api/auth',
            customer  : '/api/customer',
            employee  : '/api/employee',
            provider  : '/api/provider',
            product   : '/api/product',
            category  : '/api/category',
            plates: '/api/restaurant/plates',
        }

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio Público
        this.app.use( express.static('public'),  express.static('uploads'));
    }

    routes() {
        this.app.use( this.path.auth,       require('../routes/auth'));    //activo
        this.app.use( this.path.product,    require('../routes/product')); //activo
        this.app.use( this.path.plates, require('../routes/plates')); //activo
        this.app.use( this.path.customer,   require('../routes/customer'));
        this.app.use( this.path.employee,   require('../routes/employee'));
        this.app.use( this.path.provider,   require('../routes/provider'));
        this.app.use( this.path.category,   require('../routes/category'));

        this.app.get( '*', ( req, res ) =>{
            res.sendFile( path.resolve( __dirname, '../public/index.html') )
        });
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Server running in PORT:', this.port );
        });
    }

}

module.exports = Server;
