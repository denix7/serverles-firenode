const functions = require('firebase-functions');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Conexion a BD
const mongoConfig = { useNewUrlParser:true }

const mongouri = `mongodb+srv://denix7:olakase@cluster0-vus3b.gcp.mongodb.net/test?retryWrites=true&w=majority`

mongoose.connect(mongouri, mongoConfig)

//Iniciando Servidor
const app = express();

const Pet = require('./models/pet');

const createServer = () => {
    app.use(cors ({ origin: true}))

    app.get('/', (req, res) => {
        res.status(200).send({message: "REST API Firebase whit Node Works!"});
    })

    app.get('/pets', async (req, res) => {
        const result = await Pet.find({}).exec()
        res.send(result);
    })

    app.post('/pets', async (req, res) => {
        const { body } = req;
        const pet = new Pet(body);

        await pet.save()
        res.sendStatus(204) 
    })

    app.get('/pets/:id/dar-alta', async (req, res) => {
        const { id } = req.params;
        await Pet.deleteOne({ _id: id }).exec()
        res.sendStatus(204)
    })

    return app;
}

exports.api = functions.https.onRequest(createServer());