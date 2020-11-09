import mongodb from 'mongodb';

const mongoClient = mongodb.MongoClient;

let dbName = "kuda_db";

const uri = "mongodb+srv://testuser:test123@cluster0.zbwx9.mongodb.net/kuda_db?retryWrites=true&w=majority";

export const getCollectionDocuments = async (collectionName) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    const dataCollection = await mongo.db(dbName).collection(collectionName).find({}).toArray();
    mongo.close();
    return dataCollection;
}
export const createCollectionDocument = async (collectionName, data) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    if (!data._id) {
        data._id = new mongodb.ObjectID().toString();
        await mongo.db(dbName).collection(collectionName).insertOne(data)
    } else {
        updateCollectionDocument(collectionName, data);
    }
    mongo.close();
}
export const updateCollectionDocument = async (collectionName, data) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    var myquery = { _id: new mongodb.ObjectID(data._id) };
    var newvalues = { $set: data };
    await mongo.db(dbName).collection(collectionName).replaceOne(
        { _id : data._id },
        data, 
        { upsert: true} 
     );
    mongo.close();
}
export const deleteCollectionDocument = async (collectionName, data) => {
    const mongo = await mongoClient.connect(uri, { useUnifiedTopology: true })
    await mongo.db(dbName).collection(collectionName).deleteOne(
        { _id : data._id }
     );
    mongo.close();
}