const functions = require('firebase-functions');
const express = require('express');

const app = express();

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