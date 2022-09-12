/*
    Rutas de Usuarios / productos
    host + /api/productos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto, getProducto, actualizarProducto, borrarProducto } = require('../controllers/producto')
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.get( '/', getProducto);

router.post('/NewProducto',
[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('stock', 'El stock es obligatorio').not().isEmpty(),
    check('comentario', 'El nombre es obligatorio').not().isEmpty(),
    check('precio', 'El precio es obligatorio').not().isEmpty(),
    check('imgURL', 'Imagen URL'),
    validarCampos
], 
crearProducto);

// Actualizar Evento y validarlos con Token
router.put( '/:id', actualizarProducto );

// Eliminar Evento y validarlos con Token
router.delete( '/:id', borrarProducto );

// Asi se exporta y asi exportamos route (producto)
module.exports = router;