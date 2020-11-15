const functions = require('firebase-functions');
const express = require('express')
const bodyParser = require('body-parser')
const getCollectionDocuments = require('./database.js').getCollectionDocuments
const createCollectionDocument = require('./database.js').createCollectionDocument
const deleteCollectionDocument = require('./database.js').deleteCollectionDocument
const app = express();
const cors = require('cors')({ origin: true });

app.use(cors);
app.use(bodyParser.json())
app.get('/', async (request, response) => {
    const users = await getCollectionDocuments('users')
    response.send(users);
})
app.post('/create', async (request, response) => {
    const newUser = request.body;
    await createCollectionDocument('users', newUser);
    response.send({ message: "We received your request" })
})
app.delete('/delete', async (request, response) => {
    const userToDelete = request.body;
    await deleteCollectionDocument('users', userToDelete);
    response.send({ message: "We deleted this user:" })
})
exports.app = functions.https.onRequest(app);