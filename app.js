import http from 'http';
import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import { getCollectionDocuments, createCollectionDocument, deleteCollectionDocument } from './database.js'

const app = express();
app.use(cors());
app.use(bodyParser.json())

app.get('/', async (request, response) => {
    const users = await getCollectionDocuments('users')
    response.send(users);
})

app.post('/create', async (request, response) => {
    const newUser = request.body;
    await createCollectionDocument('users', newUser);
    response.send({message: "We received your request"})
})

app.delete('/delete', async (request, response) => {
    const userToDelete = request.body;
    await deleteCollectionDocument('users', userToDelete);
    response.send({message: "We deleted this user:"})
})

app.listen(8080)

