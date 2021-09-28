const express = require('express');
const router = new express.Router();
const empresas = require('../controllers/Empresas');
const vacantes = require('../controllers/Vacantes');
const solicitantes = require('../controllers/Solicitantes');

router.route('/empresas/:id?')
    .get(empresas.get)
    .post(empresas.post)
    .delete(empresas.delete)
    .put(empresas.put);

router.route('/vacantes/list')
    .post(vacantes.post);

router.route('/vacantes/:id/solicitantes')
    .get(vacantes.solicitantesVacante)

router.route('/vacantes/:id/solicitar')
    .post(vacantes.solicitarVacante)

router.route('/solicitantes/:id/habilidades')
    .get(solicitantes.habilidadesSolicitante)

router.route('/solicitantes/:id/experiencias')
    .get(solicitantes.experienciasSolicitante)


module.exports = router;