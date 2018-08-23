
import {Collection, FilterQuery} from "mongodb";
import {ObjectID} from "bson";
import {IDbBaseModel} from "../model/DbBaseModel";

export class BaseRepo<T extends IDbBaseModel> {

    protected c: Collection<IDbBaseModel>;

    async insertOne(doc: T): Promise<T> {
        doc.createdAt = new Date();
        doc.version = 1;
        let insertRes = await this.c.insertOne(doc);
        doc._id = insertRes.insertedId;
        return doc;
    }

    async updateOne(doc: T): Promise<T> {
        doc.updatedAt = new Date();
        doc.version++;
        await this.c.updateOne({_id: doc._id}, {$set: doc});
        return doc;
    }

    async findOneById(id: ObjectID): Promise<T> {
        return this.c.findOne<T>({_id: id});
    }

    async findAll(): Promise<T[]> {
        return this.c.find<T>({}).toArray();
    }

    async exists(query: FilterQuery<T>): Promise<boolean> {
        return !!(await this.c.findOne<T>(query));
    }

    async idExists(id: ObjectID): Promise<boolean> {
        return this.exists({_id: id});
    }

    async deleteById(id: ObjectID): Promise<number> {
        return this.c.deleteOne({_id: id}).then(r => r.deletedCount);
    }
}