const vacantes = require('../models/Vacantes');

/**
 * Busca vacantes de acuerdo a criterio: habilidad, lugar, reclutador o misma vacante
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
async function post(req, res, next) {
    
    try {
        let context = req.body;      
        
        const result = await vacantes.find(context);

        if (result.length === 1) {
            res.status(200).json(result[0]);
        }
        else {
            res.status(200).json(result);
        }
    } catch (error) {
        next(error);
    }
}

async function solicitantesVacante(req, res, next) {
    
    try {
        let id = parseInt(req.params.id,10);      
        
        const result = await vacantes.solicitantesVacante(id);

        if (result.length === 1) {
            res.status(200).json(result[0]);
        }
        else {
            res.status(200).json(result);
        }
    } catch (error) {
        next(error);
    }
}

async function solicitarVacante(req, res, next) {
    
    try {
        let vacante_id = parseInt(req.params.id,10);    
        let solicitante_id = parseInt(req.body.solicitante_id);  
        
        const result = await vacantes.solicitarVacante(vacante_id, solicitante_id);

        res.status(201).end("Your application was submitted successfully!");
    } catch (error) {
        next(error);
    }
}


module.exports.post = post;
module.exports.solicitantesVacante = solicitantesVacante;
module.exports.solicitarVacante = solicitarVacante;
