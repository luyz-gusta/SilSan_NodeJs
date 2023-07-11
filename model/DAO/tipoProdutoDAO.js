/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados dos TIPO_PRODUTO no Banco de Dados
 * Autor: Luiz Gustavo
 * Data: 23/06/2023
 * Versão: 1.0
************************************************************************************************/

/**
    //$queryRawUnsafe( ) -> Permite interpretar uma variavel como sendo um scriptSQL
    //$queryRaw( ) -> Esse executa o comando dentro de aspas e não podendo interpretar uma variavel
*/

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client');

//Instancia da classe PrismaClient
var prisma = new PrismaClient();

//Retorna a lista de todos os produtos
const mdlSelectAllTipoProduto = async function () {

    //Script para buscar todos os itens no BD
    let sql = `select tipo_produto.id, tipo_produto.nome as tipo from tbl_tipo_produto as tipo_produto;`;

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_tipo_prouto') - permite interpretar o scriptSQL direto no metodo
    let rsTipoProduto = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsTipoProduto.length > 0) {
        return rsTipoProduto
    } else {
        return false;
    }
}

//Retorna o produto pelo id
const mdlSelectTipoProdutoById = async function (id) {

    //Script para buscar todos os itens no BD
    let sql = `select tipo_produto.id, tipo_produto.nome as tipo from tbl_tipo_produto as tipo_produto where tipo_produto.id = ${id}`;

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_aluno') - permite interpretar o scriptSQL direto no metodo
    let rsTipoProduto = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsTipoProduto.length > 0) {
        return rsTipoProduto
    } else {
        return false;
    }
}

const mdlSelectLastId = async function (){

    //Script para buscar todos os itens no BD
    let sql = `select tipo_produto.id, tipo_produto.nome as tipo from tbl_tipo_produto as tipo_produto order by id desc limit 1;`;

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_aluno') - permite interpretar o scriptSQL direto no metodo
    let rsTipoProduto = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsTipoProduto.length > 0) {
        return rsTipoProduto
    } else {
        return false;
    }
}


const mdlInsertTipoProduto = async (dadosTipoProduto) => {
    let sql = `insert into tbl_tipo_produto(nome) values ('${dadosTipoProduto.nome}');`

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if(resultStatus){
        return true 
    }else{
        return false
    }
}

//insert into tbl_tipo_produto(nome) values ('Cachorros'), ('Gatos'), ('Aves');

module.exports = {
    mdlSelectAllTipoProduto,
    mdlSelectTipoProdutoById,
    mdlSelectLastId,
    mdlInsertTipoProduto
}