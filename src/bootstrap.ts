import * as express from 'express';
import {RegisterRoutes} from "./controllers/routes/routes";
import * as swaggerUI from "swagger-ui-express";
import bodyParser = require("body-parser");
import {apiErrorHandler} from "./utils/errorHandling";


export function createApp(): express.Application {
    const app: express.Application = express();

    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    //app.use(methodOverride());

    RegisterRoutes(app);

    if (process.env.NODE_ENV !== 'test') {
        // SWAGGER
        const swaggerJSON = require(__dirname+'/swagger/swagger.json');
        app.use('/swagger.json', express.static(__dirname+'/swagger/swagger.json'));
        app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
    }

    app.use(apiErrorHandler);

    return app;
}