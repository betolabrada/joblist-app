const database = require('../services/Database');

const baseQuery = 'SELECT empresa_id, nombre FROM empresa';

const insertQuery = 'INSERT INTO empresa(nombre) VALUES (?)';

const deleteQuery = 'DELETE FROM empresa WHERE empresa_id = ?';

const updateQuery = 'UPDATE empresa SET nombre = ? WHERE empresa_id = ?';

async function find(context) {
    let query = baseQuery;
    let binds = [];

    if (context.id) {
        binds.push(context.id);
        query += ' WHERE empresa_id = ?';
    }

    const results = await database.queryExecutor(query, binds);

    return results;
}

async function insert(empr) {
    let binds = [...empr];
    const result = await database.queryExecutor(insertQuery, binds);
    return result;
}

async function deleteById(id) {
    let binds = [id];
    const result = await database.queryExecutor(deleteQuery, binds);
    return result;
}

async function update(context) {
    let binds = [];
    binds.push(context.nombre);
    binds.push(context.id);
    const result = await database.queryExecutor(updateQuery, binds);
    return result;
}

module.exports.find = find;
module.exports.insert = insert;
module.exports.deleteById = deleteById;
module.exports.update = update;