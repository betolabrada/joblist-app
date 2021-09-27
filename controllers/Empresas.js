const empresas = require('../models/Empresas');

async function get(req, res, next) {
    try {
        const context = {};
        context.id = parseInt(req.params.id, 10);

        const rows = await empresas.find(context);

        if (req.params.id) {
            if (rows.length === 1) {
                console.log(rows[0]);
                res.status(200).json(rows[0]);
            }
            else {
                res.status(404).end();
            }
        }
        else {
            console.log(rows);
            res.status(200).json(rows);
        }
    } catch (error) {
        next(error);
    }
}

async function post(req, res, next) {
    
    try {
        let empr = [req.body.nombre]        
    
        const result = await empresas.insert(empr);
        res.status(201).end('Empresa Added Successfully');
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    
    try {
        let id = parseInt(req.params.id, 10);
        const result = await empresas.deleteById(id);
        res.status(201).end('Empresa Deleted Successfully');
    } catch (error) {
        next(error);
    }
}

async function put(req, res, next) {
    let context = {
        id: parseInt(req.params.id, 10),
        nombre: req.body.nombre
    }
    const result = await empresas.update(context);
    res.status(201).end("Empresa updated successfully");
}

module.exports.get = get;
module.exports.post = post;
module.exports.delete = remove;
module.exports.put = put;