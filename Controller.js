const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

//mostrando mensagem na tela com GET
app.get('/', function (req, res) {
  //resposta do servidor para o usuário
  res.send('Olá, mundo!');
});
//
app.get('/clientes', function (req, res) {
  //resposta do servidor para o usuário
  res.send('Seja bem vind@ a ServicesTI.');
});

app.get('/servicos', function (req, res) {
  //resposta do servidor para o usuário
  res.send('Página de serviço');
});

app.get('/pedidos', function (req, res) {
  //resposta do servidor para o usuário
  res.send('Página de Pedidos');
});

let port = process.env.PORT || 3001;

//app está ouvindo a porta de requisicao e resposta
//utilizando tambem uma arrow function e com msg na tela
app.listen(port, (req, res) => {
  console.log('Servidor ativo : http://localhost:3001');
  //o nosso controller aqui já está funcionando
});
