/************************************************************************************************
 * Objetivo: Responsável pela regra de negócio referente ao CRUD de LOJISTA
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
var lojistaDao = require('../model/DAO/lojistaDAO.js')
var usuarioDAO = require('../model/DAO/usuarioDAO.js')

//Retorna todos os lojistas
const ctlGetLojistas = async () => {
    let dadosLojistasJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
    let dadosLojistas = await lojistaDao.mdlSelectAllLojista()

    if (dadosLojistas) {
        dadosLojistasJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosLojistas.length,
            lojistas: dadosLojistas
        }
        return dadosLojistasJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND
    }
}

const ctlGetLojistaID = async (id) => {
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosLojistasJSON = {}

        //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
        let dadosLojista = await lojistaDao.mdlSelectLojistaId(id)

        if (dadosLojista) {
            dadosLojistasJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                lojistas: dadosLojista
            }
            return dadosLojistasJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlGetLojistaIdUsuario = async (idUsuario) => {
    if (idUsuario == '' || idUsuario == undefined || isNaN(idUsuario)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosLojistasJSON = {}

        //Chama a função do arquivo DAO que irá retornar todos os resgistros do DB
        let dadosLojista = await lojistaDao.mdlSelectLojistaIdUsuario(idUsuario)

        if (dadosLojista) {
            dadosLojistasJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                lojistas: dadosLojista
            }
            return dadosLojistasJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND
        }
    }
}

const ctlInserirLojistaUsuario = async (dadosLojistaUsuario) => {
    if (
        dadosLojistaUsuario.email_usuario == '' || dadosLojistaUsuario.email_usuario == undefined || dadosLojistaUsuario.email_usuario == null || dadosLojistaUsuario.email_usuario.length > 255 ||
        dadosLojistaUsuario.senha_usuario == '' || dadosLojistaUsuario.senha_usuario == undefined || dadosLojistaUsuario.senha_usuario == null || dadosLojistaUsuario.senha_usuario.length > 270 ||
        dadosLojistaUsuario.nome_lojista == '' || dadosLojistaUsuario.nome_lojista == undefined || dadosLojistaUsuario.nome_lojista == null || dadosLojistaUsuario.nome_lojista.length > 80 ||
        dadosLojistaUsuario.telefone_lojista == '' || dadosLojistaUsuario.telefone_lojista == undefined || dadosLojistaUsuario.telefone_lojista == null || dadosLojistaUsuario.telefone_lojista.length > 15
    ) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let resultStatus = await lojistaDao.mdlInsertLojistaUsuario(dadosLojistaUsuario)

        if (resultStatus) {
            let novoLojista = await lojistaDao.mdlSelectLastId()
            let novoUsuario = await usuarioDAO.mdlSelectLastByID()

            let dadosLojistaJSON = {
                status: message.SUCCESS_CREATED_ITEM.status,
                message: message.SUCCESS_CREATED_ITEM.message,
                lojista: novoLojista,
                usuario: novoUsuario
            }

            return dadosLojistaJSON
        } else {
            return message.ERROR_INTERNAL_SERVER
        }
    }

}

module.exports = {
    ctlGetLojistas,
    ctlGetLojistaID,
    ctlGetLojistaIdUsuario,
    ctlInserirLojistaUsuario
}