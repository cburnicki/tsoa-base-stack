import {DbConnFactory} from "../src/utils/DbConnFactory";

export function dropDb(): Promise<void> {
    console.log('DROPPING DATABASE');
    return DbConnFactory.Db.dropDatabase();
}

export function emptyCollections(): Promise<void> {
    return DbConnFactory.Db.collections()
        .then(collections => {
            return Promise.all(collections
                .map(c => c.deleteMany({}))
            )
                .then(r => null);
        });
}