/************************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de CLIENTE
 * Autor: Luiz Gustavo
 * Data: 20/06/2023
 * Versão: 1.0
************************************************************************************************/

/**********************************************************
* Métodos com inicio 'ctl' são funcões do controller
* e
* Métodos com inicio 'mdl' são funcões do model
**********************************************************/

var message = require('./modulo/config.js')
var clienteDao = require('../model/DAO/clienteDAO.js')
var usuarioDAO = require('../model/DAO/usuarioDAO.js')

//Retorna todos os clientes
const ctlGetClientes = async () => {
    let dadosClientesJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
    let dadosClientes = await clienteDao.mdlSelectAllClientes()

    if (dadosClientes) {
        dadosClientesJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosClientes.length,
            clientes: dadosClientes
        }
        return dadosClientesJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

const ctlGetClienteID = async (id) => {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosClientesJSON = {}

        //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
        let dadosClientes = await clienteDao.mdlSelectClienteByID(id)

        if (dadosClientes) {
            dadosClientesJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                clientes: dadosClientes
            }
            return dadosClientesJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlGetClienteIdUsuario = async (idUsuario) => {
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosClientesJSON = {}

        //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
        let dadosClientes = await clienteDao.mdlSelectClienteByIdUsuario(idUsuario)

        if (dadosClientes) {
            dadosClientesJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                clientes: dadosClientes
            }
            return dadosClientesJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlInserirCliente = async (dadosCliente) => {
    if (
        dadosCliente.nome == '' || dadosCliente.nome == undefined || dadosCliente.nome == null || dadosCliente.nome.length > 80 ||
        dadosCliente.telefone == '' || dadosCliente.telefone == undefined || dadosCliente.telefone == null || dadosCliente.telefone.length > 15 ||
        dadosCliente.data_nascimento == '' || dadosCliente.data_nascimento == undefined || dadosCliente.data_nascimento == null ||
        dadosCliente.id_usuario == '' || dadosCliente.id_usuario == undefined || dadosCliente.id_usuario == null || isNaN(dadosCliente.id_usuario)
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultStatus = await clienteDao.mdlInsertCliente(dadosCliente)

        if (resultStatus) {
            let novoCliente = await clienteDao.mdlSelectLastId()

            let dadosClienteJSON = {
                status: message.SUCCESS_CREATED_ITEM.status,
                message: message.SUCCESS_CREATED_ITEM.message,
                novo_cliente: novoCliente
            }

            return dadosClienteJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

const ctlInserirClienteUsuario = async (dadosClienteUsuario) => {
    if (
        dadosClienteUsuario.email_usuario == '' || dadosClienteUsuario.email_usuario == undefined || dadosClienteUsuario.email_usuario == null || dadosClienteUsuario.email_usuario.length > 255 ||
        dadosClienteUsuario.senha_usuario == '' || dadosClienteUsuario.senha_usuario == undefined || dadosClienteUsuario.senha_usuario == null || dadosClienteUsuario.senha_usuario.length > 270 ||
        dadosClienteUsuario.nome_cliente == '' || dadosClienteUsuario.nome_cliente == undefined || dadosClienteUsuario.nome_cliente == null || dadosClienteUsuario.nome_cliente.length > 80 ||
        dadosClienteUsuario.telefone_cliente == '' || dadosClienteUsuario.telefone_cliente == undefined || dadosClienteUsuario.telefone_cliente == null || dadosClienteUsuario.telefone_cliente.length > 15 ||
        dadosClienteUsuario.data_nascimento_cliente == '' || dadosClienteUsuario.data_nascimento_cliente == undefined || dadosClienteUsuario.data_nascimento_cliente == null
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultStatus = await clienteDao.mdlInsertClienteUsuario(dadosClienteUsuario)

        if (resultStatus) {
            let novoCliente = await clienteDao.mdlSelectLastId()
            let novoUsuario = await usuarioDAO.mdlSelectLastByID()

            let dadosClienteJSON = {
                status: message.SUCCESS_CREATED_ITEM.status,
                message: message.SUCCESS_CREATED_ITEM.message,
                cliente: novoCliente,
                usuario: novoUsuario
            }

            return dadosClienteJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

module.exports = {
    ctlGetClientes,
    ctlGetClienteID,
    ctlGetClienteIdUsuario,
    ctlInserirCliente,
    ctlInserirClienteUsuario
}