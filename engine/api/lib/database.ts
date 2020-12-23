
import {MongoClient} from 'mongodb';

const uri = `mongodb+srv://admin:${process.env.DB_PASSWORD}@chordata.v9yqd.mongodb.net/chordata?retryWrites=true&w=majorit`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let connection = undefined;

async function getCollection(name: string) {
    connection = connection ?? await client.connect()
    return client.db('chordata').collection(name);
}

export const db = {
    projects: () => getCollection('projects')
}