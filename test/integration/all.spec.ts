
import {createApp} from "../../src/bootstrap";
import {DbConnFactory} from "../../src/utils/DbConnFactory";
import {dropDb} from "../helper";
import {testAuthors} from "./authors";
import {Server} from "http";
import {Application} from "express";
import {SuperTest} from "supertest";

export const request = require("supertest");

const app: Application = createApp();
let server: Server;

describe("All tests", () => {

    before(() => {
        return DbConnFactory.initDb()
            .then(r => {
                server = app.listen(3000);
            });
    });

    testAuthors(app);

    after(() => {
        server.close();
        return dropDb();
    })

});