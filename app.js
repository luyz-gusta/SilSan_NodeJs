/**************************************************************************************
 *  Objetivo: API para integração entre back e banco de dados (GET, POST, PUT, DELETE)
 *  Autor: Luiz Gustavo
 *  Data: 19/06/2023
 *  Versão: 1.0
 **************************************************************************************/

/**
 * Express - dependencia para realizar requisições de API pelo protocolo HTTP 
 *      npm install express --save
 * 
 *  Cors - dependencia para gerenciar permissões de requisição da API
 *      npm install cors --save
 * 
 *  Body-Parser - dependencia que gerencia o corpo das resquisições 
 *      npm install body-parser --save
 **/

//Dependencia para criar as requisições de API
const express = require('express');

//Dependencia para gerenciar as permissões da API
const cors = require('cors');

//Dependencia para gerenciar o corpo das requisições da API
const bodyParser = require('body-parser');

//Cria o objeto app conforme a classe do express
const app = express()

app.use((request, response, next) => {
    //Define quem poderá acessar a api(* - Todos)
    response.header('Acess-Control-Allow-Origin', '*')

    //Define quais metodos serão utilizados na api
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    //Atribui as permissões ao cors
    app.use(cors())

    next()
})

//CRUD (Create, Read, Update e Delete)

/*
Instalação do PRISMA no projeto (biblioteca para conexão com Banco de Dados)
    npm install prisma --save
    npx prisma
    npx prisma init
    npm install @prisma/client --save

    npx prisma migrate dev  ###Serve para realizar o sincronismo entre o prisma e o Banco de Dados
*/

/*****************************************************************************************************************
* Objetivo: API de controle de STATUS DE USUARIO
* Data: 20/06/2023
* Autor: Luiz e Gustavo
* Versão: 1.0
******************************************************************************************************************/

//Define que os dados que irão chegar no body da requisição será no padrao JSON
const bodyParserJson = bodyParser.json();

//Import do arquivo da controller que irá solicitar a model os dados do BD
var controllerStatusUsuario = require('./controller/controller_status-usuario.js')

//EndPoint: Retorna todos os dados de status de usuario
app.get('/v1/avicultura-silsan/status-usuario', cors(), async function (request, response) {

    //Recebe os dados da controller do status de usuario    
    let dadosStatusUsuario = await controllerStatusUsuario.ctlGetStatusUsuario();

    response.status(dadosStatusUsuario.status);
    response.json(dadosStatusUsuario);
})

//EndPoint: Retorna o status de usuario filtrando pelo ID
app.get('/v1/avicultura-silsan/status-usuario/:id', cors(), async function (request, response) {

    let idStatus = request.params.id;

    //Recebe os dados da controller do status de usuario    
    let dadosStatusUsuario = await controllerStatusUsuario.ctlGetBuscarStatusUsuarioID(idStatus);

    response.status(dadosStatusUsuario.status);
    response.json(dadosStatusUsuario);
})

//EndPoint: Insere um dado novo 
app.post('/v1/avicultura-silsan/status-usuario', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type'];

    if (String(contentType).toLowerCase() == 'application/json') {

        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body;

        let resultDadosStatusUsuario = await controllerStatusUsuario.ctlInsertStatusUsuario(dadosBody)

        response.status(resultDadosStatusUsuario.status)
        response.json(resultDadosStatusUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
        response.json(message.ERROR_INVALID_CONTENT_TYPE);
    }
})

//EndPoint: Atualiza um status de usuario existente, filtrando pelo ID
app.put('/v1/avicultura-silsan/status-usuario/:id', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type'];

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do aluno pelo parametro
        let idStatus = request.params.id;

        //Recebe os dados encaminhados no corpo da requisição
        let dadosBody = request.body;

        //Encaminha os dados para a controller
        let resultDadosStatusUsuario = await controllerStatusUsuario.ctlAtualizarStatusUsuarioID(dadosBody, idStatus);

        response.status(resultDadosStatusUsuario.status);
        response.json(resultDadosStatusUsuario);
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status);
        response.json(message.ERROR_INVALID_CONTENT_TYPE);
    }
})

//EndPoint: Exclui um status de usuario, filtrando pelo ID
app.delete('/v1/avicultura-silsan/status-usuario/:id', cors(), async function (request, response) {

    // Recebe o ID do status de usuario pelo parametro
    let idStatus = request.params.id

    // Encaminha os dados para a controller
    let resultDadosStatusUsuario = await controllerStatusUsuario.ctlDeletarStatusUsuario(idStatus)

    if (resultDadosStatusUsuario.length != 0) {
        response.status(resultDadosStatusUsuario.status)
        response.json(resultDadosStatusUsuario)
    } else {
        message.ERROR_INVALID_ID
    }
})

/*****************************************************************************************************************
* Objetivo: API de controle de USUARIO
* Data: 20/06/2023
* Autor: Luiz Gustavo
* Versão: 1.0
******************************************************************************************************************/

var controllerUsuario = require('./controller/controller_usuario.js')

//EndPoint: Retorna todos os dados de usuario
app.get('/v1/avicultura-silsan/usuario', cors(), async function (request, response) {
    let idStatusUsuario = request.query.idStatusUsuario

    if (idStatusUsuario != undefined) {
        let dadosUsuariosJSON = await controllerUsuario.ctlGetUsuarioIdStatusUsuario(idStatusUsuario)

        response.status(dadosUsuariosJSON.status)
        response.json(dadosUsuariosJSON)
    } else {
        let dadosUsuario = await controllerUsuario.ctlGetUsuarios()

        response.status(dadosUsuario.status)
        response.json(dadosUsuario)
    }
})

//EndPoint: Retorna o usuario filtrando pelo ID
app.get('/v1/avicultura-silsan/usuario/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id

    let dadosUsuariosJSON = await controllerUsuario.ctlGetUsuarioID(idUsuario)

    response.status(dadosUsuariosJSON.status)
    response.json(dadosUsuariosJSON)
})

//EndPoint: Retorna o usuario filtrando pelo Email e Senha
app.get('/v1/avicultura-silsan/usuario-email-senha', cors(), async function (request, response) {
    let dadosUsuario = await controllerUsuario.ctlGetUsuarios()

    response.status(dadosUsuario.status)
    response.json(dadosUsuario)
})

//EndPoint: Retorna o usuario filtrando pelo Email e Senha
app.get('/v1/avicultura-silsan/usuario-email-senha/:email', cors(), async function (request, response) {
    let emailUsuario = request.params.email

    let senhaUsuario = request.query.senha

    let dadosUsuariosJSON = await controllerUsuario.ctlGetUsuarioEmailSenha(emailUsuario, senhaUsuario)

    response.status(dadosUsuariosJSON.status)
    response.json(dadosUsuariosJSON)
})

//EndPoint: Retorna o usuario filtrando pelo Email
app.get('/v1/avicultura-silsan/usuario-email', cors(), async function (request, response) {
    let dadosUsuariosJSON = await controllerUsuario.ctlGetEmailUsuario()

    response.status(dadosUsuariosJSON.status)
    response.json(dadosUsuariosJSON)
})

//EndPoint: Retorna o usuario filtrando pelo Email
app.get('/v1/avicultura-silsan/usuario-email/:email', cors(), async function (request, response) {
    let emailUsuario = request.params.email

    let dadosUsuariosJSON = await controllerUsuario.ctlGetUsuarioEmail(emailUsuario)

    response.status(dadosUsuariosJSON.status)
    response.json(dadosUsuariosJSON)
})

//EndPoint: Retorna o usuario filtrando pelo nivel
app.get('/v1/avicultura-silsan/usuario/nivel/:nivel', cors(), async function (request, response) {
    let nivelUsuario = request.params.nivel

    let dadosUsuariosJSON = await controllerUsuario.ctlGetUsuarioNivel(nivelUsuario)

    response.status(dadosUsuariosJSON.status)
    response.json(dadosUsuariosJSON)
})

//EndPoint: Insere um dado novo 
app.post('/v1/avicultura-silsan/usuario', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosUsuario = await controllerUsuario.ctlInserirUsuario(dadosBody)

        response.status(resultDadosUsuario.status)
        response.json(resultDadosUsuario)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: Atualiza um usuario existente, filtrando pelo ID
app.put('/v1/avicultura-silsan/usuario/:id', cors(), bodyParserJson, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe o ID do aluno pelo parametro
        let idUsuario = request.params.id;

        //Recebe os dados dos aluno encaminhado no corpo da requisição
        let dadosBody = request.body

        let resultDadosAlunos = await controllerUsuario.ctlAtualizarUsuario(dadosBody, idUsuario)

        response.status(resultDadosAlunos.status)
        response.json(resultDadosAlunos)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: Exclui um usuario, filtrando pelo ID
app.delete('/v1/avicultura-silsan/usuario/:id', cors(), async function (request, response) {
    let idUsuario = request.params.id;

    let resultDadosUsuario = await controllerUsuario.ctlExcluirUsuario(idUsuario)

    response.status(resultDadosUsuario.status)
    response.json(resultDadosUsuario)
})

/*****************************************************************************************************************
* Objetivo: API de controle de CLIENTES
* Data: 20/06/2023
* Autor: Luiz Gustavo
* Versão: 1.0
******************************************************************************************************************/

//Import do araquivo da controler que irá solicitar a model os do BD
var controllerCliente = require('./controller/controller_cliente.js')

//EndPoint: Retorna todos os dados dos clientes
app.get('/v1/avicultura-silsan/cliente', cors(), async function (request, response) {
    let dadosClientes = await controllerCliente.ctlGetClientes()

    response.status(dadosClientes.status)
    response.json(dadosClientes)
})

//EndPoint: Retorna o cliente pelo id
app.get('/v1/avicultura-silsan/cliente/:id', cors(), async function (request, response) {
    let idCliente = request.params.id

    let dadosClientes = await controllerCliente.ctlGetClienteID(idCliente)

    response.status(dadosClientes.status)
    response.json(dadosClientes)
})

//EndPoint: Insere um novo cliente
app.post('/v1/avicultura-silsan/cliente', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosCliente = await controllerCliente.ctlInserirCliente(dadosBody)

        response.status(resultDadosCliente.status)
        response.json(resultDadosCliente)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: Insere um novo cliente junto com o usuario
app.post('/v1/avicultura-silsan/cliente-usuario', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosCliente = await controllerCliente.ctlInserirClienteUsuario(dadosBody)

        response.status(resultDadosCliente.status)
        response.json(resultDadosCliente)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

/*****************************************************************************************************************
* Objetivo: API de controle de LOJISTAS
* Data: 20/06/2023
* Autor: Luiz Gustavo
* Versão: 1.0
******************************************************************************************************************/

//Import do araquivo da controler que irá solicitar a model os do BD
var controllerLojsita = require('./controller/controller_lojista.js')

//EndPoint: Retorna todos os lojistas
app.get('/v1/avicultura-silsan/lojista', cors(), async function (request, response) {
    let dadosLojistas = await controllerLojsita.ctlGetLojistas()

    response.status(dadosLojistas.status)
    response.json(dadosLojistas)
})

//EndPoint: Retorna o lojista pelo id
app.get('/v1/avicultura-silsan/lojista/:id', cors(), async function (request, response) {
    let idLojista = request.params.id

    let dadosLojistas = await controllerLojsita.ctlGetLojistaID(idLojista)

    response.status(dadosLojistas.status)
    response.json(dadosLojistas)
})

//EndPoint: Insere um novo lojista junto com o usuario
app.post('/v1/avicultura-silsan/lojista-usuario', cors(), bodyParserJson, async function (request, response) {

    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosLojista = await controllerLojsita.ctlInserirLojistaUsuario(dadosBody)

        response.status(resultDadosLojista.status)
        response.json(resultDadosLojista)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

/*****************************************************************************************************************
* Objetivo: API de controle de TIPO_PRODUTO
* Data: 23/06/2023
* Autor: Luiz Gustavo
* Versão: 1.0
******************************************************************************************************************/

//Import do araquivo da controler que irá solicitar a model os do BD
var controllerTipoProduto = require('./controller/controller_tipo-produto.js')

//EndPoint: Retorna todos os TipoProduto
app.get('/v1/avicultura-silsan/tipo-produto', cors(), async function (request, response) {
    let dadosTipoProduto = await controllerTipoProduto.ctlGetTipoProduto()

    response.status(dadosTipoProduto.status)
    response.json(dadosTipoProduto)
})

//EndPoint: Retorna o TipoProduto pelo id
app.get('/v1/avicultura-silsan/tipo-produto/:id', cors(), async function (request, response) {
    let idTipoProduto = request.params.id

    let dadosTipoProduto = await controllerTipoProduto.ctlGetTipoProdutoPeloId(idTipoProduto)

    response.status(dadosTipoProduto.status)
    response.json(dadosTipoProduto)
})

//EndPoint: Insere um produto novo
app.post('/v1/avicultura-silsan/tipo-produto', cors(), bodyParserJson, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosTipoProduto = await controllerTipoProduto.ctlInserirTipoProduto(dadosBody)

        response.status(resultDadosTipoProduto.status)
        response.json(resultDadosTipoProduto)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})


/*****************************************************************************************************************
* Objetivo: API de controle de PRODUTOS
* Data: 19/06/2023
* Autor: Luiz Gustavo
* Versão: 1.0
******************************************************************************************************************/

//Import do araquivo da controler que irá solicitar a model os do BD
var controllerProduto = require('./controller/controller_produto.js')

//EndPoint: Retorna todos os dados de produtos ou pelo id do lojista por query
app.get('/v1/avicultura-silsan/produto', cors(), async function (request, response) {
    let dadosProduto = await controllerProduto.ctlGetProdutos()

    response.status(dadosProduto.status)
    response.json(dadosProduto)
})

//EndPoint: Retorna o produto filtrando pelo ID
app.get('/v1/avicultura-silsan/produto/:id', cors(), async function (request, response) {
    let idProduto = request.params.id

    let dadosProduto = await controllerProduto.ctlGetProdutoPeloId(idProduto)

    response.status(dadosProduto.status)
    response.json(dadosProduto)
})

//EndPoint: Insere um produto novo
app.post('/v1/avicultura-silsan/produto', cors(), bodyParserJson, async function (request, response) {
    //Recebe o content-type da requisição
    let contentType = request.headers['content-type']

    //Validação para receber dados apenas no formato JSON
    if (String(contentType).toLowerCase() == 'application/json') {
        //Recebe os dados encaminhados na requisição
        let dadosBody = request.body

        let resultDadosProdutos = await controllerProduto.ctlInserirProduto(dadosBody)

        response.status(resultDadosProdutos.status)
        response.json(resultDadosProdutos)
    } else {
        response.status(message.ERROR_INVALID_CONTENT_TYPE.status)
        response.json(message.ERROR_INVALID_CONTENT_TYPE)
    }
})

//EndPoint: Atualiza um produto existente, filtrando pelo ID
app.put('/v1/avicultura-silsan/produto/:id', cors(), bodyParserJson, async function (request, response) {

})

//EndPoint: Exclui um produto, filtrando pelo ID
app.delete('/v1/avicultura-silsan/produto/:id', cors(), async function (request, response) {
    let idProduto = request.params.id;

    let resultDadosProdutos = await controllerProduto.ctlDeletarProduto(idProduto)

    response.status(resultDadosProdutos.status)
    response.json(resultDadosProdutos)
})


app.listen(8080, () => console.log('Servidor aguardando requisições na porta 8080.'))
