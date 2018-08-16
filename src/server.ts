import * as express from 'express';
import * as swaggerUI from "swagger-ui-express";
import {UsersController} from "./controllers/UserController";
import {RegisterRoutes} from "./controllers/routes/routes";
const swaggerJSON = require('./swagger/swagger.json');

const app: express.Application = express();

RegisterRoutes(app);

// SWAGGER
app.use('/swagger.json', express.static(__dirname + '/swagger/swagger.json'));
app.use('/', swaggerUI.serve, swaggerUI.setup(swaggerJSON));

app.listen(3000);
console.log('SERVER LISTENING ON PORT 3000');