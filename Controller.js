const express = require('express');
const cors = require('cors');
//vamos utilizar a models associada a const
const models = require('./models');

const app = express();
app.use(cors());

//rota no formato json
app.use(express.json());

//cliente chamando a Classe Cliente
let cliente = models.Cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;

//mostrando mensagem na tela com GET
app.get('/', function (req, res) {
  //resposta do servidor para o usuário
  res.send('Olá, mundo!');
});
//passando as informações pode dentro da aplicacao

app.post('/clientes', async (req, res) => {
  await cliente
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: 'Cliente criado com sucesso',
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Foi impossível se conectar!',
      });
    });
});
//criando para passar as informações
//definindo rota, com resposta, espera, com nome,descricao e data de inclusao e atualizacao
app.post('/servicos', async (req, res) => {
  await servico
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: 'Serviço criado com sucesso',
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Foi impossível se conectar!',
      });
    });
});

app.post('/pedidos', async (req, res) => {
  await pedido
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: 'Pedido Criado com sucesso!!',
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Foi impossível se conectar.',
      });
    });
});

app.post('itenspedido', async (req, res) => {
  await itempedido
    .create(req.body)
    .then(function () {
      return res.json({
        error: false,
        message: 'Item criado com sucesso!',
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Foi impossível se conectar.',
      });
    });
});

let port = process.env.PORT || 3001;

//criando consultas retornando todos os valores
// app.get('/listaservicos', async (req, res) => {
//   await servico
//     .findAll({
//       raw: true,
//     })
//     .then(function (servicos) {
//       //formata que vai retornar
//       res.json({ servicos });
//     });
// });
//retornando em ordem
app.get('/listaservicos', async (req, res) => {
  await servico
    .findAll({
      //raw: true,
      order: [['nome', 'DESC']],
    })
    .then(function (servicos) {
      //formata que vai retornar
      res.json({ servicos });
    });
});
//retorna quantidade de id
app.get('/ofertaservicos', async (req, res) => {
  await servico.count('id').then(function (servicos) {
    res.json({ servicos });
  });
});

app.get('/servico/:id', async (req, res) => {
  await servico.findByPK(req.params.id).then(serv => {
      return res.json({
        error: false,
        serv,
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro: código não encontrado!',
      });
    });
});

//app está ouvindo a porta de requisicao e resposta
//utilizando tambem uma arrow function e com msg na tela
app.listen(port, (req, res) => {
  console.log('Servidor ativo : http://localhost:3001');
  //o nosso controller aqui já está funcionando
});
