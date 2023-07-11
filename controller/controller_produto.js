/**************************************************************************************
 *  Objetivo: Responsavel pela regra de negocio referente ao CRUD de ALUNOS
 *  Autor: Luiz e Muryllo
 *  Data: 14/04/2023
 *  Versão: 1.0
 **************************************************************************************/

//Import do arquivo DAO para acessar dados do produto no BD
var produtosDAO = require('../model/DAO/produtoDAO.js')

var message = require('./modulo/config.js')

//Retorna a lista de todos os produtos
const ctlGetProdutos = async function () {

    let dadosProdutosJSON = {}

    //Chama a função do arquivo DAO que irá retornar todos os registros do BD
    let dadosProduto = await produtosDAO.mdlSelectAllProdutos()

    if (dadosProduto) {
        //Criando um JSON com o atributo aluno, para encaminhar um array de alunos
        dadosProdutosJSON = {
            status: message.SUCCESS_REQUEST.status,
            message: message.SUCCESS_REQUEST.message,
            quantidade: dadosProduto.length,
            itens: dadosProduto
        }
        return dadosProdutosJSON
    } else {
        return message.ERROR_REGISTER_NOT_FOUND;
    }

}

//Retorna o produto filtrando pelo ID
const ctlGetProdutoPeloId = async function (id) {

    //Validação do ID
    if (id == '' || id == undefined || isNaN(id)) {
        return message.ERROR_INVALID_ID
    } else {
        let dadosProdutosJSON = {}

        let dadosProduto = await produtosDAO.mdlSelectProdutoById(id)

        if (dadosProduto) {
            //Criando um JSON com o atributo aluno, para encaminhar um array de produtos
            dadosProdutosJSON = {
                status: message.SUCCESS_REQUEST.status,
                message: message.SUCCESS_REQUEST.message,
                item: dadosProduto
            }

            return dadosProdutosJSON
        } else {
            return message.ERROR_REGISTER_NOT_FOUND;
        }
    }
}

const ctlInserirProduto = async (dadosProduto) => {
    if(
        dadosProduto.nome == '' || dadosProduto.nome == null || dadosProduto.nome == undefined || dadosProduto.nome.length > 100 ||
        dadosProduto.descricao == '' || dadosProduto.descricao == null || dadosProduto.descricao == undefined || 
        dadosProduto.peso == '' || dadosProduto.peso == null || dadosProduto.peso == undefined || isNaN(dadosProduto.peso) ||
        dadosProduto.cupom == '' || dadosProduto.cupom == null || dadosProduto.cupom == undefined || dadosProduto.cupom.length > 15 ||
        dadosProduto.url == '' || dadosProduto.url == null || dadosProduto.url == undefined ||
        dadosProduto.preco_original == '' || dadosProduto.preco_original == null || dadosProduto.preco_original == undefined || isNaN(dadosProduto.preco_original) || 
        dadosProduto.preco_desconto == '' || dadosProduto.preco_desconto == null || dadosProduto.preco_desconto == undefined || isNaN(dadosProduto.preco_desconto) || 
        dadosProduto.id_tipo_produto == '' || dadosProduto.id_tipo_produto == null || dadosProduto.id_tipo_produto == undefined || isNaN(dadosProduto.id_tipo_produto)
    ){
        return message.ERROR_REQUIRE_FIELDS
    }else if(dadosProduto.preco_original < dadosProduto.preco_desconto){
        return message.ERROR_INVALID_VALORES
    } else{
        let resultStatus = await produtosDAO.mdlInsertProduto(dadosProduto)

        if(resultStatus){
            let novoProduto = await produtosDAO.mdlSelectLastId()

            let dadosProdutoJSON = {
                status: message.SUCCESS_CREATED_ITEM.status,
                message: message.SUCCESS_CREATED_ITEM.message,
                novo_produto: novoProduto
            }

            return dadosProdutoJSON
        }else{
            return message.ERROR_INTERNAL_SERVER
        }
    }
}

//Excluir um status de produto existente
const ctlDeletarProduto = async function (id) {

    if (id == '' || id == undefined || id == null || isNaN(id)) {
        return message.ERROR_REQUIRE_FIELDS
    } else {
        let buscarProduto = await produtosDAO.mdlSelectProdutoById(id)

        if (buscarProduto  == false) {
            return message.ERROR_REGISTER_NOT_FOUND
        } else {
            let status = await produtosDAO.mdlDeleteProduto(id)

            if (status) {
                return message.SUCCESS_DELETED_ITEM
            } else {
                message.ERROR_INTERNAL_SERVER
            }
        }
    }
}

module.exports = {
    ctlGetProdutos,
    ctlGetProdutoPeloId,
    ctlInserirProduto,
    ctlDeletarProduto
}