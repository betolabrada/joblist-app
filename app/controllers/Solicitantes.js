const solicitantes = require('../models/Solicitantes');

/**
 * GET habilidades de solicitante
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function habilidadesSolicitante(req, res, next) {
    
    try {
        let id = parseInt(req.params.id,10);      
        
        const result = await solicitantes.habilidadesSolicitante(id);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

/**
 * GET experiencias de solicitante
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
 async function experienciasSolicitante(req, res, next) {
    
    try {
        let id = parseInt(req.params.id,10);      
        
        const result = await solicitantes.experienciasSolicitante(id);

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}


module.exports.habilidadesSolicitante = habilidadesSolicitante;
module.exports.experienciasSolicitante = experienciasSolicitante;
