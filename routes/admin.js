/*
    Rutas de Usuarios / admin
    host + /api/admin
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearAdmin, getAdmin, actualizarAdmin, borrarAdmin } = require('../controllers/admin')
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();


router.get( '/', getAdmin);

router.post('/NewAdmin',
        [
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('nivel', 'El Nivel es obligatorio').not().isEmpty(),
            check('fecha', 'La fecha es obligatoria').not().isEmpty(),
            check('telefono', 'El telefono es obligatorio').not().isEmpty(),
            validarCampos
        ], 
        crearAdmin);

// Actualizar Evento y validarlos con Token
router.put( '/:id', actualizarAdmin );

// Eliminar Evento y validarlos con Token
router.delete( '/:id', borrarAdmin );


module.exports = router;