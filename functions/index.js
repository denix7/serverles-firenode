const functions = require('firebase-functions');
const express = require('express');
const mongoose = require('mongoose');

//Conexion a BD
const mongoConfig = { useNewUrlParser:true }
mongoose.connect('mongodb+srv://denix7:olakase@cluster0-vus3b.gcp.mongodb.net/test?retryWrites=true&w=majority', mongoConfig)
    .then(() => {
        console.log('Conexion a bd ATLAS ok')
    })
    .catch(err => console.log(err))

//Iniciando Servidor
const app = express();

const Pet = require('./models/pet');

const createServer = () => {
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

    app.get('/pets/:id/dar-alta', (req, res) => {
        res.send('Dar alta mascota')
    })

    return app;
}

exports.api = functions.https.onRequest(createServer());