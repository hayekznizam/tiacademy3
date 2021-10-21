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

app.get('/clientes', async (req, res) => {
  await cliente.create({
    nome: 'Vinícius Andrei',
    endereco: 'Rua Romário Martins',
    cidade: 'Maringá',
    uf: 'PR',
    nascimento: '1999-10-30',
    clienteDesde: '2021-10-21',
  });
  res.send('Cliente Adicionado com sucesso');
});
//criando para passar as informações
//definindo rota, com resposta, espera, com nome,descricao e data de inclusao e atualizacao
app.post('/servicos', async (req, res) => {
  await servico
    .create(
      req.body)
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

app.get('/pedidos', async (req, res) => {
  await pedido.create({
    ClienteId: 3,
    data: '2021-10-21',
  });
  res.send('Pedido criado com sucesso.');
});

app.get('itenspedido', async (req, res) => {
  await itempedido.create({
    PedidoId: 1,
    ServicoId: 2,
    quantidade: 3,
    valor: 100.0,
  });
});

let port = process.env.PORT || 3001;

//app está ouvindo a porta de requisicao e resposta
//utilizando tambem uma arrow function e com msg na tela
app.listen(port, (req, res) => {
  console.log('Servidor ativo : http://localhost:3001');
  //o nosso controller aqui já está funcionando
});
