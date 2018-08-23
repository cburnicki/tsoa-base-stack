import * as express from 'express';
import {RegisterRoutes} from "./controllers/routes/routes";
import * as swaggerUI from "swagger-ui-express";
import bodyParser = require("body-parser");

const swaggerJSON = require('./swagger/swagger.json');

export function createApp(): express.Application {
    const app: express.Application = express();

    // SWAGGER
    app.use('/swagger.json', express.static(__dirname + '/swagger/swagger.json'));
    app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    //app.use(methodOverride());

    RegisterRoutes(app);

    return app;
}