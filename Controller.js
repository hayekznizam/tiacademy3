const express = require('express');
const cors = require('cors');
//vamos utilizar a models associada a const
const { sequelize } = require('./models');
const models = require('./models');
const { application } = require('express');

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

//cadastrando cliente
app.post('/clientes/cadastrar', async(req, res) => {
  await cliente.create(
      req.body        
  ).then(function() {
      return res.json({
          error: false,
          message: "Cliente criado com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao criar o cliente."
      })
  });
});

app.get('/clientes/quantidade', async(req, res) => {
  await cliente.count('id')
  .then(function(clientes) {
      res.json({
          error: false,
          clientes
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao retornar a quantidade de clientes."
      });
  });
});

app.get('/clientes/:id', async(req, res) => {
  if(!await cliente.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Cliente não encontrado."
      });
  };

  await cliente.findByPk(req.params.id, {include: [{all: true}]})
  .then(cli => {
      return res.json({
          error: false,
          cli
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao buscar o cliente."
      });
  });
});

app.get('/clientes/:id/pedidos', async(req, res) => {
  if(!await cliente.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Cliente não encontrado."
      });
  };

  await pedido.findAll({
      where: {ClienteId: req.params.id} 
  }).then(function(peds) {
      return res.json({
          error: false,            
          peds
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao encontrar pedidos."
      });
  });
});

app.put('/clientes/:id/editar', async(req, res) => {
  if(!await cliente.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Cliente não encontrado."
      });
  };

  const cli = {
      nome: req.body.nome,
      endereco: req.body.endereco,
      cidade: req.body.cidade,
      uf: req.body.uf,
      nascimento: req.body.nascimento,
      clienteDesde: req.body.clienteDesde
  };

  await cliente.update(cli, {
      where: {id: req.params.id}
  }).then(function() {
      return res.json({
          error: false,
          message: "Cliente alterado com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao alterar o cliente."
      });
  });
});

app.get('/clientes/:id/excluir', async(req, res) => {
  if(!await cliente.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Cliente não encontrado."
      });
  };

  await cliente.destroy({
      where: {id: req.params.id}
  }).then(function() {
      return res.json({
          error: false,
          message: "Cliente excluído com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao excluir o cliente."
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

//cadastro serviços 

app.post('/servicos/cadastrar', async(req, res) => {
  await servico.create(
      req.body        
  ).then(function() {
      return res.json({
          error: false,
          message: "Serviço criado com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao criar o serviço."
      })
  });    
});

app.get('/servicos/:id', async(req, res) => {
  if(!await servico.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Serviço não encontrado."
      });
  };

  await servico.findByPk(req.params.id)
  .then(serv => {
      return res.json({
          error: false,
          serv
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao buscar o serviço."
      });
  });
});


app.get('/servicos/quantidade', async(req, res) => {
  await servico.count('id')
  .then(function(servicos) {
      res.json({
          error: false,
          servicos
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao exibir a quantidade de serviços."
      });
  });
});

app.get('/servicos/:id/pedidos', async(req, res) => {
  if(!await servico.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Serviço não encontrado."
      });
  };

  await servico.findByPk(
      req.params.id, {include: [{all: true}]})
  .then(serv => {
      return res.json({
          error: false,
          serv
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao buscar o serviço."
      });
  });
});

pp.put('/servicos/:id/editar', async(req, res) => {
  if(!await servico.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Serviço não encontrado."
      });
  };

  const serv = {
      nome: req.body.nome,
      descricao: req.body.descricao
  }

  await servico.update(serv, {
      where: {id: req.params.id}
  }).then(function() {
      return res.json({
          error: false,
          message: "Serviço alterado com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao alterar o serviço."
      });
  });
});

app.get('/servicos/:id/excluir', async(req, res) => {
  if(!await servico.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Serviço não encontrado."
      });
  };

  await servico.destroy({
      where: {id: req.params.id}
  }).then(function() {
      return res.json({
          error: false,
          message: "Serviço excluído com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao excluir o serviço."
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


app.post('/pedidos/cadastrar', async(req, res) => {
  await pedido.create(
      req.body
  ).then(function() {
      return res.json({
          error: false,
          message: "Pedido criado com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao criar o pedido."
      })
  });
});

app.get('/pedidos/quantidade', async(req, res) => {
  await pedido.count('id')
  .then(function(pedidos) {
      res.json({
          error: false,
          pedidos
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao exibir a quantidade de pedidos."
      });
  });
});

pp.get('/pedidos/:id', async(req, res) => {
  if(!await pedido.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Pedido não encontrado."
      });
  };

  await pedido.findByPk(req.params.id, {include: [{all: true}]})
  .then(ped => {
      return res.json({
          error: false,
          ped
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao buscar o pedido."
      });
  });
});

pp.put('/pedidos/:id/editar', async(req, res) => {
  if(!await pedido.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Pedido não encontrado."
      });
  };

  const ped = {
      data: req.body.data
  };

  await pedido.update(ped, {
      where: {id: req.params.id}
  }).then(function() {
      return res.json({
          error: false,
          message: "Pedido alterado com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao alterar o pedido."
      });
  });
});

app.get('/pedidos/:id/excluir', async(req, res) => {
  if(!await pedido.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Pedido não encontrado."
      });
  };

  await pedido.destroy({
      where: {id: req.params.id}
  }).then(function() {
      return res.json({
          error: false,
          message: "Pedido excluído com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao excluir o pedido."
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

app.post('/itempedido/cadastrar', async(req, res) => {
  await itempedido.create(
      req.body
  ).then(function() {
      return res.json({
          error: false,
          message: "Item adicionado ao pedido com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao adicionar o item ao pedido."
      })
  });
});

app.get('/itempedido/quantidade', async(req, res) => {
  await itempedido.count('id')
  .then(function(itens) {
      res.json({
          error: false,
          itens
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao exibir a quantidade de itens."
      });
  });
});

app.put('/pedidos/:id/item/editar', async(req, res) => {
  if(!await pedido.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Pedido não encontrado."
      });
  };

  if(!await servico.findByPk(req.body.ServicoId)) {
      return res.status(400).json({
          erro: true,
          message: "Pedido não encontrado."
      });
  };

  const item = {
      quantidade: req.body.quantidade,
      valor: req.body.valor
  };

  await itempedido.update(item, {
      where: Sequelize.and(
          {ServicoId: req.body.ServicoId},
          {PedidoId: req.params.id}
      )
  }).then(function(itens) {
      return res.json({
          error: false,
          message: "Pedido alterado com sucesso!",
          itens
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao alterar pedido."
      });
  });
});

app.get('/pedidos/:id/item/excluir', async(req, res) => {
  if(!await pedido.findByPk(req.params.id)) {
      return res.status(400).json({
          erro: true,
          message: "Pedido não encontrado."
      });
  };

  await itempedido.destroy({        
      where: Sequelize.and({
          ServicoId: req.body.ServicoId, 
          PedidoId: req.params.id
      })
  }).then(function() {
      return res.json({
          error: false,
          message: "Item excluído com sucesso!"
      });
  }).catch(function(erro) {
      return res.status(400).json({
          error: true,
          message: "Erro ao excluir o item."
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
// não funciona a partir daqui
app.get('/servico/:id', async (req, res) => {
  await servico
    .findByPK(req.params.id)
    .then((serv) => {
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

// app.get('/atualizaservico', async (req, res) => {
//   await servico.findByPK(2).then((serv) => {
//     serv.nome = 'HTML/CSS/JS';
//     serv.descricao = 'Páginas estáticas e dinâmicas estilizadas';
//     serv.save();
//     return res.json({ serv });
//   });
// });

app.put('/atualizaservico', async (req, res) => {
  await servico
    .update(req.body, {
      where: { id: req.body.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Serviço foi alterado com sucesso!',
      });
    })
    .catch(function (erro) {
      return res.status(400).json({
        error: true,
        message: 'Erro na alteração do serviço.',
      });
    });
});

//método put fazendo a alteração
app.put('/pedidos/:id/editaritem', async (req, res) => {
  const item = {
    quantidade: req.body.quantidade,
    valor: req.body.valor,
  };
  if (!(await pedido.findByPK(req.params.id))) {
    return res.status(400).json({
      error: true,
      message: 'Pedido não foi encontrado.',
    });
  }
  if (!(await servico.findByPK(req.body.ServicoId))) {
    return res.status(400).json({
      error: true,
      message: 'Servico não foi encontrado',
    });
  }
  await itempedido.update(item, {
    where: Sequelize.and(
      { ServicoId: req.body.ServicoId },
      { PedidoId: req.params.id },
    ).then(function (itens) {
      return res.json({
        error: false,
        message: 'Pedido foi alterado com sucesso',
        itens,
      });
    }).catch(function(erro){
      return res.status(400).json({
        error:true,
        message:"Não foi possível alterar."
      });
    })
  });
});

//consulta mostrando todos os relacionamentos
app.get('/pedidos/:id', async (req, res) => {
  await pedido
    .findByPK(req.params.id, { include: [{ all: true }] })
    .then((ped) => {
      return res.json({ ped });
    });
});
//excluir cliente

app.get('/excluircliente/:id', async (req, res) => {
  await cliente
    .destroy({
      where: { id: req.params.id },
    })
    .then(function () {
      return res.json({
        error: false,
        message: 'Cliente excluído com sucesso.',
      });
    })
    .catch((erro) => {
      return res.status(400).json({
        error: true,
        message: 'Erro: impossível excluir cliente.',
      });
    });
});

//app está ouvindo a porta de requisicao e resposta
//utilizando tambem uma arrow function e com msg na tela
app.listen(port, (req, res) => {
  console.log('Servidor ativo : http://localhost:3001');
  //o nosso controller aqui já está funcionando
});
