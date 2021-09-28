const database = require('../services/Database');

const habilidadesSolicitanteQuery = 'SELECT H.nombre as habilidad FROM solicitante S JOIN solicitante_habilidad SH ON S.solicitante_id = SH.solicitante_id JOIN habilidad H ON SH.habilidad_id = H.habilidad_id WHERE S.solicitante_id = ?';

const experienciasSolicitanteQuery = 'SELECT E.* FROM solicitante S JOIN experiencia E ON E.solicitante_id = S.solicitante_id WHERE S.solicitante_id = ?';

/**
 * Find habilidades solicitante
 * @param id
 * @returns 
 */
 async function habilidadesSolicitante(id) {
    let query = habilidadesSolicitanteQuery;
    let binds = [];
    binds.push(id);

    let results = await database.queryExecutor(query, binds);
    results = results.map(result => result.habilidad);
    return results;
}

/**
 * Experiencias de solicitante
 * @param id
 * @returns 
 */
 async function experienciasSolicitante(id) {
    let query = experienciasSolicitanteQuery;
    let binds = [];
    binds.push(id);

    let results = await database.queryExecutor(query, binds);
    return results;
}

module.exports.habilidadesSolicitante = habilidadesSolicitante;
module.exports.experienciasSolicitante = experienciasSolicitante;