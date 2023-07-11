/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de ALUNOS
 *  Autor: Luiz e Muryllo
 *  Data: 23/06/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo DAO para acessar dados do produto no BD
var tipoProdutoDAO = require('../model/DAO/tipoProdutoDAO.js')

var message = require('./modulo/config.js')

//Retorna a lista de todos os produtos
const ctlGetTipoProduto = async function () {

    let dadosTipoProdutosJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosTipoProduto = await tipoProdutoDAO.mdlSelectAllTipoProduto()

    if (dadosTipoProduto) {
        //Criando um JSON com o atributo aluno, para encaminhar um array de alunos
        dadosTipoProdutosJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosTipoProduto.length,
            tipos: dadosTipoProduto
        }
        return dadosTipoProdutosJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND;
    }

}

//Retorna o produto filtrando pelo ID
const ctlGetTipoProdutoPeloId = async function (id) {

    //Validação do ID
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosTipoProdutosJSON = {}

        //Chama a função do arquivo DAO que irá retornar todos os registros do BD
        let dadosTipoProduto = await tipoProdutoDAO.mdlSelectTipoProdutoById(id)

        if (dadosTipoProduto) {
            //Criando um JSON com o atributo aluno, para encaminhar um array de alunos
            dadosTipoProdutosJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                quantidade: dadosTipoProduto.length,
                tipos: dadosTipoProduto
            }
            return dadosTipoProdutosJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
}

const ctlInserirTipoProduto = async (dadosTipoProduto) => {
    if(dadosTipoProduto.nome == '' || dadosTipoProduto.nome == null || dadosTipoProduto.nome == undefined || dadosTipoProduto.nome.length > 60){
        return message.ERROR_INVALID_NOME
    }else{
        let resultDadosTipoProduto = await tipoProdutoDAO.mdlInsertTipoProduto(dadosTipoProduto)

        if(resultDadosTipoProduto){
            let novoTipoProduto = await tipoProdutoDAO.mdlSelectLastId()

            let dadosTipoProdutosJSON = {
                status: message.SUCCESS_CREATED_ITEM.status,
                message: message.SUCCESS_CREATED_ITEM.message,
                novo_tipo: novoTipoProduto
            }
            return dadosTipoProdutosJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
}


module.exports = {
    ctlGetTipoProduto,
    ctlGetTipoProdutoPeloId,
    ctlInserirTipoProduto
}