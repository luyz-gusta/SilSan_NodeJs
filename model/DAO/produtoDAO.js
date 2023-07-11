/************************************************************************************************
 * Objetivo: Responsável pea manipulação de dados dos PRODUTOS no Banco de Dados
 * Autor: Luiz Gustavo
 * Data: 19/06/2023
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
const mdlSelectAllProdutos = async function () {

    //Script para buscar todos os itens no BD
    let sql = `
    select
        produto.id, 
        produto.nome, 
        produto.descricao, 
        produto.peso,
        produto.cupom,
        produto.url,
        produto.preco_original,
        produto.preco_desconto,
        produto.status_produto,
        produto.id_tipo_produto,
        tipo_produto.nome as tipo
    from tbl_produto as produto
        inner join tbl_tipo_produto as tipo_produto
            on produto.id_tipo_produto = tipo_produto.id;`

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_produto') - permite interpretar o scriptSQL direto no metodo
    let rsProduto = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsProduto.length > 0) {
        return rsProduto
    } else {
        return false;
    }
}

//Retorna o produto pelo id
const mdlSelectProdutoById = async function (id) {

    //Script para buscar todos os itens no BD
    let sql = `
    select * from tbl_produto as produto
        inner join tbl_tipo_produto as tipo_produto
            on produto.id_tipo_produto = tipo_produto.id
    where produto.id = ${id};`

    //$queryRawUnsafe(sql) - permite interpretar uma variavel como sendo um sriptSQL
    //queryRaw('select * from tbl_aluno') - permite interpretar o scriptSQL direto no metodo
    let rsProduto = await prisma.$queryRawUnsafe(sql)

    //Valida de o Banco de Dados retornou algum registro
    if (rsProduto.length > 0) {
        return rsProduto
    } else {
        return false;
    }
}

const mdlSelectLastId = async function () {

    let sql = `
    select
        produto.id, 
        produto.nome, 
        produto.descricao, 
        produto.peso,
        produto.cupom,
        produto.url,
        produto.preco_original,
        produto.preco_desconto,
        produto.status_produto,
        produto.id_tipo_produto,
        tipo_produto.nome as tipo
    from tbl_produto as produto
        inner join tbl_tipo_produto as tipo_produto
            on produto.id_tipo_produto = tipo_produto.id order by id desc limit 1;`

    let rsProduto = await prisma.$queryRawUnsafe(sql)

    if (rsProduto.length > 0) {
        return rsProduto
    } else {
        return false
    }
}

const mdlInsertProduto = async (dadosProduto) => {
    let sql = `
    insert into tbl_produto(
        nome,
        descricao,
        peso,
        cupom,
        url,
        preco_original,
        preco_desconto,
        id_tipo_produto
    )values(
        '${dadosProduto.nome}',
        '${dadosProduto.descricao}',
        ${dadosProduto.peso},
        '${dadosProduto.cupom}',
        '${dadosProduto.url}',
        ${dadosProduto.preco_original},
        ${dadosProduto.preco_desconto},
        ${dadosProduto.id_tipo_produto}
    );
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return true
    } else {
        return false
    }
}

const mdlDeleteProduto = async (id) => {
    let sql = `delete from tbl_produto where id = ${id}` 

    let resultStatus = await prisma.$queryRawUnsafe(sql)
    
    if(resultStatus){
        return true
    }else{
        return false
    }
}

module.exports = {
    mdlSelectAllProdutos,
    mdlSelectProdutoById,
    mdlSelectLastId,
    mdlInsertProduto,
    mdlDeleteProduto
}