import { MongoClient } from 'mongodb';

let mongoClient: MongoClient;

const getDbClient = () => {
    return mongoClient;
}

const getAccountsCollection = () => {
    return mongoClient.db("roma").collection("accounts");
}


const connectToDb = async () => {
    const URL = 'mongodb://romashka:pcHg03iGzuYg9PwF@cluster0-shard-00-00.arfwf.mongodb.net:27017,cluster0-shard-00-01.arfwf.mongodb.net:27017,cluster0-shard-00-02.arfwf.mongodb.net:27017?ssl=true&replicaSet=atlas-spkmbx-shard-0&authSource=admin&retryWrites=true&w=majority'
    mongoClient = await MongoClient.connect(URL, {
        useNewUrlParser: true,
        minPoolSize: 0,
        maxPoolSize: 10,
    });
}

export const DB = {
    connectToDb,
    getDbClient,
    getAccountsCollection,
}

