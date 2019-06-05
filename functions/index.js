const functions = require('firebase-functions');
const express = require('express');
const mongoose = require('mongoose');

const mongoConfig = { useNewUrlParser:true }
mongoose.connect('mongodb+srv://denix7:olakase@cluster0-vus3b.gcp.mongodb.net/test?retryWrites=true&w=majority', mongoConfig)
    .then(() => {
        console.log('Conexion a bd ATLAS ok')
    })
    .catch(err => console.log(err))

const app = express();

const Pets = require('./models/pets');

const createServer = () => {
    app.get('/pets', (req, res) => {
        res.send('datos de prueba')
    })

    app.post('/pets', (req, res) => {
        res.send('Crear mascota')
    })

    app.get('/pets/:id/dar-alta', (req, res) => {
        res.send('Dar alta mascota')
    })

    return app;
}

exports.api = functions.https.onRequest(createServer());