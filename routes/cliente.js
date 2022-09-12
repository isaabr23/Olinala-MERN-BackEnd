/*
    Rutas de Usuarios / cliente
    host + /api/cliente
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearCliente, getCliente, actualizarCliente, borrarCliente } = require('../controllers/cliente')
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get( '/', getCliente);


router.post('/NewCliente',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').not().isEmpty(),
    check('telefono', 'El telefono es obligatorio').not().isEmpty(),
    check('mensaje', 'El mensaje es obligatorio').not().isEmpty(),
    check('modo', 'El modo es obligatorio').not().isEmpty(),
    check('fecha', 'El fecha es obligatorio').not().isEmpty(),
    check('hora', 'El hora es obligatorio').not().isEmpty(),
    validarCampos
], 
crearCliente);

// Actualizar Evento y validarlos con Token
router.put( '/:id', actualizarCliente );

// Eliminar Evento y validarlos con Token
router.delete( '/:id', borrarCliente );

module.exports = router;