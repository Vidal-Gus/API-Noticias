const express = require('express');
const rota = require('./rotas');
const buscarEndereco = require('./middlewares');
const app = express();

app.use(express.json());
app.use(buscarEndereco);
app.use(rota);

app.listen(3000);
