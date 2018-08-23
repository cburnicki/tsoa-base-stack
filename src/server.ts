
import * as express from 'express';
import * as swaggerUI from "swagger-ui-express";
import {RegisterRoutes} from "./controllers/routes/routes";
import bodyParser = require("body-parser");
const swaggerJSON = require('./swagger/swagger.json');

const app: express.Application = express();

RegisterRoutes(app);

// SWAGGER
app.use('/swagger.json', express.static(__dirname + '/swagger/swagger.json'));
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//app.use(methodOverride());

RegisterRoutes(app);

app.listen(3000);
console.log('SERVER LISTENING ON PORT 3000');