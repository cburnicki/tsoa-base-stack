import {Db, MongoClient} from "mongodb";

const dbName = process.env.NODE_ENV === 'test' ? 'eventHubTest' : 'eventHub';

export class DbConnFactory {

    private static _db: Db;

    private static createIndices() {
        return;
    }

    public static initDb() {
        return MongoClient.connect('mongodb://mongo:27017').then(c => {
            DbConnFactory._db = c.db(dbName);
            return DbConnFactory.createIndices();
        });
    }

    public static get Db(): Db {
        return DbConnFactory._db;
    }
}