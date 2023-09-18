const express = require('express');
const rota = express();
const buscarNoticias = require('./controladores/buscarNoticias');

rota.get('/noticias', buscarNoticias.buscarPorCep);

module.exports = rota;
