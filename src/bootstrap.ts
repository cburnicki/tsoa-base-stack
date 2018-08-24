import * as express from 'express';
import {RegisterRoutes} from "./controllers/routes/routes";
import * as swaggerUI from "swagger-ui-express";
import bodyParser = require("body-parser");
import {apiErrorHandler} from "./utils/errorHandling";

const swaggerJSON = require('./swagger/swagger.json');

export function createApp(): express.Application {
    const app: express.Application = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    //app.use(methodOverride());

    RegisterRoutes(app);

    // SWAGGER
    app.use('/swagger.json', express.static(__dirname + '/swagger/swagger.json'));
    app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

    app.use(apiErrorHandler);

    return app;
}