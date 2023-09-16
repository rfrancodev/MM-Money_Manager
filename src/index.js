const express = require('express');
const rotas = require('./roteador');
const verificarSenha = require('./autenticacao');

const app = express();

app.use(express.json())

app.use(verificarSenha)

app.use(rotas)

app.listen(3000)