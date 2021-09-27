const database = require('../services/Database');

const baseQuery = 'SELECT empresa_id, nombre FROM empresa';

const vacantesBaseQuery = `SELECT DISTINCT(V.vacante_id), V.descripcion, V.remoto, R.nombre as reclutador_nombre, E.nombre as empresa_nombre, L.*, B.descripcion as beneficio_descripcion FROM vacante V JOIN reclutador_vacante RV ON RV.vacante_id = V.vacante_id JOIN reclutador R ON R.reclutador_id = RV.reclutador_id JOIN empresa E ON E.empresa_id = V.empresa_id JOIN vacante_lugar VL ON VL.vacante_id = V.vacante_id JOIN lugar L ON L.lugar_id = VL.lugar_id JOIN beneficio B ON B.vacante_id = V.vacante_id JOIN vacante_habilidad VH ON VH.vacante_id = V.vacante_id JOIN habilidad H ON VH.habilidad_id = H.habilidad_id`;

const solicitantesVacanteQuery = 'SELECT S.solicitante_id, S.puede_reubicarse FROM solicitante S JOIN solicitante_vacante SV ON SV.solicitante_id = S.solicitante_id WHERE SV.vacante_id = ?';

const insertQuery = 'INSERT INTO solicitante_vacante(timestamp, vacante_id, solicitante_id) VALUES (NOW(), ?, ?)'

const deleteQuery = 'DELETE FROM empresa WHERE empresa_id = ?';

const updateQuery = 'UPDATE empresa SET nombre = ? WHERE empresa_id = ?';

/**
 * Find vacantes
 * @param {} context 
 * @returns 
 */
async function find(context) {
    let query = vacantesBaseQuery;
    let binds = [];

    if (context.reclutador_id) {
        binds.push(parseInt(context.reclutador_id, 10));
        query += ' WHERE R.reclutador_id = ?';
    }

    else if (context.lugar_id) {
        binds.push(parseInt(context.lugar_id));
        query += ' WHERE L.lugar_id = ?';
    }

    else if (context.habilidad_id) {
        binds.push(parseInt(context.habilidad_id)); 
        query += ' WHERE H.habilidad_id = ?';
    }

    else if (context.empresa_id) {
        binds.push(parseInt(context.empresa_id)); 
        query += ' WHERE E.empresa_id = ?';
    }

    else if (context.vacante_id) {
        binds.push(parseInt(context.vacante_id)); 
        query += ' WHERE V.vacante_id = ?';
    }

    const results = await database.queryExecutor(query, binds);

    return results;
}

/**
 * Find vacantes
 * @param id
 * @returns 
 */
 async function solicitantesVacante(id) {
    let query = solicitantesVacanteQuery;
    let binds = [];
    binds.push(id);

    const results = await database.queryExecutor(query, binds);

    return results;
}

/**
 * Solicitar Vacante
 * @param vacante_id
 * @param solicitante_id
 * @returns 
 */
 async function solicitarVacante(vacante_id, solicitante_id) {
    let query = insertQuery;
    let binds = [];
    binds.push(vacante_id);
    binds.push(solicitante_id);

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
module.exports.solicitantesVacante = solicitantesVacante;
module.exports.solicitarVacante = solicitarVacante;
module.exports.insert = insert;
module.exports.deleteById = deleteById;
module.exports.update = update;