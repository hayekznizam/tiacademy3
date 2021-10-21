const express = require('express');
const cors = require('cors');
//vamos utilizar a models associada a const
const models = require('./models');

const app = express();
app.use(cors());

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
app.get('/servicos', async (req, res) => {
  await servico.create({
    nome: 'Nodejs',
    descricao: 'Desenvolvimento de aplicação back-end',
    createAt: new Date(),
    updateAt: new Date(),
  });
  res.send('Serviço criado com sucesso');
});

app.get('/pedidos', async (req, res) => {
  await pedido.create({
    id: '3',
    dataPedido: '2021-10-21',
    createAt: new Date(),
    updateAt: new Date(),
  });
  res.send('Pedido criado com sucesso.');
});

let port = process.env.PORT || 3001;

//app está ouvindo a porta de requisicao e resposta
//utilizando tambem uma arrow function e com msg na tela
app.listen(port, (req, res) => {
  console.log('Servidor ativo : http://localhost:3001');
  //o nosso controller aqui já está funcionando
});
