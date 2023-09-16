const express = require('express');
const fs = require('fs/promises');
const bancodedados = require('../bancodedados');
const { format } = require('date-fns')

let numeroConta = bancodedados.contas.length + 1;

const listarContas = async (req, res) => {
    return res.json(bancodedados);
};

const criarConta = async (req, res) => {
    const { saldo, usuario } = req.body;

    if (!usuario.nome) {
        return res.status(400).json({ mensagem: 'Campo nome é obrigatório!' })
    }

    if (!usuario.cpf) {
        return res.status(400).json({ mensagem: 'Campo cpf é obrigatório!' })
    }

    if (!usuario.data_nascimento) {
        return res.status(400).json({ mensagem: 'Campo data_nascimento é obrigatório!' })
    }

    if (!usuario.telefone) {
        return res.status(400).json({ mensagem: 'Campo telefone é obrigatório!' })
    }

    if (!usuario.email) {
        return res.status(400).json({ mensagem: 'Campo email é obrigatório!' })
    }

    if (!usuario.senha) {
        return res.status(400).json({ mensagem: 'Campo senha é obrigatório!' })
    }

    const verificarCpf = bancodedados.contas.find((cliente) => {
        return cliente.usuario.cpf === usuario.cpf
    });

    if (verificarCpf) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf informado!' })
    }

    const verificarEmail = bancodedados.contas.find((cliente) => {
        return cliente.usuario.email === usuario.email
    });

    if (verificarEmail) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o email informado!' })
    }

    const novaConta = {
        numero: numeroConta++,
        saldo,
        usuario
    }

    bancodedados.contas.push(novaConta);

    return res.status(201).send();

};

const atualizarConta = async (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const numeroContaRequisitado = Number(req.params.numeroConta);

    if (isNaN(numeroContaRequisitado)) {
        return res.status(400).json({ mensagem: 'O numero informado não é um numero válido!' })
    }

    if (!nome) {
        return res.status(400).json({ mensagem: 'Campo nome é obrigatório!' })
    }

    if (!cpf) {
        return res.status(400).json({ mensagem: 'Campo cpf é obrigatório!' })
    }

    if (!data_nascimento) {
        return res.status(400).json({ mensagem: 'Campo data_nascimento é obrigatório!' })
    }

    if (!telefone) {
        return res.status(400).json({ mensagem: 'Campo telefone é obrigatório!' })
    }

    if (!email) {
        return res.status(400).json({ mensagem: 'Campo email é obrigatório!' })
    }

    if (!senha) {
        return res.status(400).json({ mensagem: 'Campo senha é obrigatório!' })
    }

    const verificarCpf = bancodedados.contas.find((cliente) => {
        return cliente.usuario.cpf === cpf
    });

    if (verificarCpf) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado!' })
    }

    const verificarEmail = bancodedados.contas.find((cliente) => {
        return cliente.usuario.email === email
    });

    if (verificarEmail) {
        return res.status(400).json({ mensagem: 'O email informado já existe cadastrado!' })
    }

    const clienteExistente = bancodedados.contas.find((cliente) => {
        return cliente.numero === numeroContaRequisitado

    });

    if (!clienteExistente) {
        return res.status(404).json({ mensagem: 'Não existe cliente para ser atualizado!' });
    }
    clienteExistente.usuario.nome = nome;
    clienteExistente.usuario.cpf = cpf;
    clienteExistente.usuario.telefone = telefone;
    clienteExistente.usuario.data_nascimento = data_nascimento;
    clienteExistente.usuario.email = email;
    clienteExistente.usuario.senha = senha;

    return res.send();

};

const excluirConta = async (req, res) => {
    const numeroContaRequisitado = Number(req.params.numeroConta);

    if (isNaN(numeroContaRequisitado)) {
        return res.status(400).json({ mensagem: 'O numero informado não é um numero válido!' })
    }

    const clienteExistente = bancodedados.contas.find((cliente) => {
        return cliente.numero === numeroContaRequisitado

    });

    if (!clienteExistente) {
        return res.status(404).json({ mensagem: 'Não existe cliente para ser atualizado!' });
    }

    if (clienteExistente.saldo > 0) {
        return res.status(400).json({ mensagem: "A conta só pode ser removida se o saldo for zero!" })

    }

    const indiceClienteExclusao = bancodedados.contas.findIndex((cliente) => {
        return cliente.numero === Number(numeroContaRequisitado);

    });

    if (indiceClienteExclusao === -1) {
        return res.status(404).json({ mensagem: 'Cliente não encontrado!' })
    }

    const clienteExcluido = bancodedados.contas.splice(indiceClienteExclusao, 1)[0];

    return res.send()

};

const depositarConta = async (req, res) => {
    const { numero_conta, valor } = req.body;

    if (!numero_conta || !valor) {
        return res.status(400).json({ mensagem: 'O número da conta e o valor são obrigatórios!' });
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: 'Não é permitido deposito de valores negativos ou zerados!' });
    }

    const clienteExistente = bancodedados.contas.find((cliente) => {
        return cliente.numero === Number(numero_conta)

    });

    if (!clienteExistente) {
        return res.status(404).json({ mensagem: 'Não existe cliente para ser atualizado!' });
    }

    const novoSaldo = clienteExistente.saldo + valor;

    clienteExistente.saldo = novoSaldo

    const dataAtual = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    bancodedados.depositos.push({
        data: dataAtual,
        numero_conta,
        valor
    });

    return res.send()

};

const sacarConta = async (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, valor e senha são obrigatórios!' });
    }

    const clienteExistente = bancodedados.contas.find((cliente) => {
        return cliente.numero === Number(numero_conta)

    });

    if (!clienteExistente) {
        return res.status(404).json({ mensagem: 'Não existe cliente para conta informada!' });
    }

    if (clienteExistente.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: "Senha incorreta!" })

    }

    if (clienteExistente.saldo < valor) {
        return res.status(403).json({ mensagem: "Saldo insuficiente!" })

    }

    const novoSaldo = clienteExistente.saldo - valor;

    clienteExistente.saldo = novoSaldo

    const dataAtual = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    bancodedados.saques.push({
        data: dataAtual,
        numero_conta,
        valor
    });
    return res.send()

};

const transferirConta = async (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta, valor e senha são obrigatórios!' });
    }

    const clienteContaOrigem = bancodedados.contas.find((cliente) => {
        return cliente.numero === Number(numero_conta_origem)

    });

    if (!clienteContaOrigem) {
        return res.status(404).json({ mensagem: 'Não existe cliente para conta informada!' });
    }

    const clienteContaDestino = bancodedados.contas.find((cliente) => {
        return cliente.numero === Number(numero_conta_destino)

    });

    if (!clienteContaDestino) {
        return res.status(404).json({ mensagem: 'Não existe cliente para conta informada!' });
    }

    if (clienteContaOrigem.usuario.senha !== senha) {
        return res.status(403).json({ mensagem: "Senha incorreta!" })

    }

    if (clienteContaOrigem.saldo < valor) {
        return res.status(403).json({ mensagem: "Saldo insuficiente!" })

    }

    const novoSaldoOrigem = clienteContaOrigem.saldo - valor;
    clienteContaOrigem.saldo = novoSaldoOrigem

    const novoSaldoDestino = clienteContaDestino.saldo + valor;
    clienteContaDestino.saldo = novoSaldoDestino


    const dataAtual = format(new Date(), 'yyyy-MM-dd HH:mm:ss')

    bancodedados.transferencias.push({
        data: dataAtual,
        numero_conta_origem,
        numero_conta_destino,
        valor
    });

    return res.send()

};

const consultarSaldoConta = async (req, res) => {
    const { numero_conta, senha } = req.params;


    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e senha são obrigatórios!' });
    }

    const clienteExistente = bancodedados.contas.find((cliente) => {
        return cliente.numero === Number(numero_conta);

    });

    if (!clienteExistente) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
    }

    if (clienteExistente.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" })
    }

    return res.status(200).json({ saldo: clienteExistente.saldo })

};

const extratoConta = async (req, res) => {
    const { numero_conta, senha } = req.params;

    if (!numero_conta || !senha) {
        return res.status(400).json({ mensagem: 'O número da conta e senha são obrigatórios!' });
    }

    const clienteExistente = bancodedados.contas.find((cliente) => {
        return cliente.numero === Number(numero_conta);
    });

    if (!clienteExistente) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontada!' });
    }

    if (clienteExistente.usuario.senha !== senha) {
        return res.status(401).json({ mensagem: "Senha incorreta!" })
    }

    const resgistroDepositos = bancodedados.depositos.filter((deposito) => {
        return deposito.numero_conta === numero_conta;
    });

    const resgistroSaque = bancodedados.saques.filter((saques) => {
        return saques.numero_conta === numero_conta;
    });

    const transferenciasEnviadas = bancodedados.transferencias.filter((transferencia) => {
        return transferencia.numero_conta_origem === numero_conta;
    });

    const transferenciasRecebeida = bancodedados.transferencias.filter((transferencia) => {
        return transferencia.numero_conta_destino === numero_conta;
    });

    const extrato = {
        depositos: resgistroDepositos,
        saques: resgistroSaque,
        transferenciasEnviadas: transferenciasEnviadas,
        transferenciasRecebidas: transferenciasRecebeida
    };

    return res.json(extrato)

};

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    excluirConta,
    depositarConta,
    sacarConta,
    transferirConta,
    consultarSaldoConta,
    extratoConta
}