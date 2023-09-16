const express = require('express');

const { listarContas, criarConta, atualizarConta, excluirConta, depositarConta, sacarConta, transferirConta, consultarSaldoConta, extratoConta } = require('./controladores/transacao');

const rotas = express();

rotas.get('/contas', listarContas);

rotas.post('/contas', criarConta);

rotas.put('/contas/:numeroConta/usuario', atualizarConta);

rotas.delete('/contas/:numeroConta', excluirConta);

rotas.post('/transacoes/depositar', depositarConta);

rotas.post('/transacoes/sacar', sacarConta);

rotas.post('/transacoes/transferir', transferirConta);

rotas.get('/contas/saldo/:numero_conta/:senha', consultarSaldoConta);

rotas.get('/contas/extrato/:numero_conta/:senha', extratoConta);

module.exports = rotas;
