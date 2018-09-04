
import {emptyCollections} from "../helper";
import {expect} from 'chai';
import {Application} from "express";

export const request = require("supertest");

export function testAuthors(app: Application) {
    describe('Test authors endpoint', () => {

        it('Add an author', () => {
            return request(app).post('/authors')
                .send({
                    name: 'J. R. R. Tolkien'
                })
                .expect(201)
                .then(res => {
                    const author = res.body;
                    expect(author.id).to.not.be.empty;
                    expect(author.name).to.be.eql('J. R. R. Tolkien');
                })
        });

        after(() => {
           return emptyCollections();
        });
    });
}