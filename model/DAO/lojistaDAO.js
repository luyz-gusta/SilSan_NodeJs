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

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllLojista = async () => {
    let sql = `
    select 
	    lojista.id as id_lojista,
        lojista.nome,
        lojista.telefone,
        lojista.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_lojista as lojista
    	inner join tbl_usuario as usuario 
	    	on lojista.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id;`

    let rsLojista = await prisma.$queryRawUnsafe(sql)

    if (rsLojista.length > 0) {
        return rsLojista
    } else {
        return false
    }
}

const mdlSelectLojistaId = async (id) => {
    let sql = `
    select 
	    lojista.id as id_lojista,
        lojista.nome,
        lojista.telefone,
        lojista.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_lojista as lojista
    	inner join tbl_usuario as usuario 
	    	on lojista.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id
    where lojista.id = ${id} ;`

    let rsLojista = await prisma.$queryRawUnsafe(sql)

    if (rsLojista.length > 0) {
        return rsLojista
    } else {
        return false
    }
}

const mdlSelectLojistaIdUsuario = async (idUsuario) => {
    let sql = `
    select 
	    lojista.id as id_lojista,
        lojista.nome,
        lojista.telefone,
        lojista.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_lojista as lojista
    	inner join tbl_usuario as usuario 
	    	on lojista.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id
    where lojista.id_usuario= ${idUsuario} ;`

    let rsLojista = await prisma.$queryRawUnsafe(sql)

    if (rsLojista.length > 0) {
        return rsLojista
    } else {
        return false
    }
}

//Retorna o ultimo id inserido no BD
const mdlSelectLastId = async function () {

    let sql = `
    select 
	    lojista.id as id_lojista,
        lojista.nome,
        lojista.telefone,
        lojista.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_lojista as lojista
    	inner join tbl_usuario as usuario 
	    	on lojista.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id order by id desc limit 1;`

    let rsLojista = await prisma.$queryRawUnsafe(sql)

    if (rsLojista.length > 0) {
        return rsLojista
    } else {
        return false
    }
}

const mdlInsertLojistaUsuario = async (dadosLojistaUsuario) => {
    let sql = `
    call sp_inserir_lojista_usuario(
        '${dadosLojistaUsuario.email_usuario}',
        '${dadosLojistaUsuario.senha_usuario}',
        '${dadosLojistaUsuario.nome_lojista}',
        '${dadosLojistaUsuario.telefone_lojista}'    
        );
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}



module.exports = {
    mdlSelectAllLojista,
    mdlSelectLojistaId,
    mdlSelectLojistaIdUsuario,
    mdlSelectLastId,
    mdlInsertLojistaUsuario
}