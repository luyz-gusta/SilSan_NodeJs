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

//Import da biblioteca do prisma client
var { PrismaClient } = require('@prisma/client')

//Instancia da Classe PrismaClient 
var prisma = new PrismaClient()

const mdlSelectAllClientes = async () => {
    let sql = `
    select 
	    cliente.id as id_cliente,
        cliente.nome,
        cliente.telefone,
        date_format(cliente.data_nascimento, '%Y-%m-%d') as data_nascimento,  
        cliente.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_cliente as cliente
    	inner join tbl_usuario as usuario 
		    on cliente.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id;`

    let rsCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCliente.length > 0) {
        return rsCliente
    } else {
        return false
    }
}

const mdlSelectClienteByID = async (id) => {
    let sql = `
    select 
	    cliente.id as id_cliente,
        cliente.nome,
        cliente.telefone,
        date_format(cliente.data_nascimento, '%Y-%m-%d') as data_nascimento,  
        cliente.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_cliente as cliente
    	inner join tbl_usuario as usuario 
		    on cliente.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id
    where cliente.id = ${id};`

    let rsCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCliente.length > 0) {
        return rsCliente
    } else {
        return false
    }
}

const mdlSelectClienteByIdUsuario = async (idUsuario) => {
    let sql = `
    select 
	    cliente.id as id_cliente,
        cliente.nome,
        cliente.telefone,
        date_format(cliente.data_nascimento, '%Y-%m-%d') as data_nascimento,  
        cliente.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_cliente as cliente
    	inner join tbl_usuario as usuario 
		    on cliente.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id
    where cliente.id_usuario = ${idUsuario};`

    let rsCliente = await prisma.$queryRawUnsafe(sql)

    if (rsCliente.length > 0) {
        return rsCliente
    } else {
        return false
    }
}

//Retorna o ultimo id inserido no BD
const mdlSelectLastId = async function () {

    let sql = `
    select 
	    cliente.id as id_cliente,
        cliente.nome,
        cliente.telefone,
        date_format(cliente.data_nascimento, '%Y-%m-%d') as data_nascimento,  
        cliente.id_usuario,
        usuario.email,
        status_usuario.nivel
    from tbl_cliente as cliente
    	inner join tbl_usuario as usuario 
		    on cliente.id_usuario = usuario.id
	    inner join tbl_status_usuario as status_usuario 
			on usuario.id_status_usuario = status_usuario.id order by id desc limit 1;`

    let rsCliente = await prisma.$queryRawUnsafe(sql);

    if (rsCliente.length > 0) {
        return rsCliente;
    } else {
        return false;
    }
}

const mdlInsertCliente = async (dadosCliente) => {
    let sql = `
    insert into tbl_cliente(
        nome, 
        telefone, 
        data_nascimento, 
        id_usuario
    ) values (
        '${dadosCliente.nome}',
        '${dadosCliente.telefone}',
        '${dadosCliente.data_nascimento}',
        ${dadosCliente.id_usuario}
    );
    `

    let resultStatus = await prisma.$executeRawUnsafe(sql)

    if (resultStatus) {
        return resultStatus
    } else {
        return false
    }
}

const mdlInsertClienteUsuario = async (dadosClienteUsuario) => {
    let sql = `
    call sp_inserir_cliente_usuario(
        '${dadosClienteUsuario.email_usuario}',
        '${dadosClienteUsuario.senha_usuario}',
        '${dadosClienteUsuario.nome_cliente}',
        '${dadosClienteUsuario.telefone_cliente}',
        '${dadosClienteUsuario.data_nascimento_cliente}'
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
    mdlSelectAllClientes,
    mdlSelectClienteByID,
    mdlSelectClienteByIdUsuario,
    mdlSelectLastId,
    mdlInsertCliente,
    mdlInsertClienteUsuario
}