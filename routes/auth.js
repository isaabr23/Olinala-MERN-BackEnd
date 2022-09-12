/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { crearUsuario, loginUsuario } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/validar-campos');
const router = Router();

router.post('/new',
        [ // middlewares
            // ('nombre del usuario', 'mensaje de error').que no este vacio
            check('nombre', 'El nombre es obligatorio').not().isEmpty(),
            // ('email del usuario', 'mensaje de error').que sea email
            check('email', 'El email es obligatorio').isEmail(),
            // ('password del usuario', 'mensaje de error').que sea mayor a 6 caracteres
            check('Password', 'El password debe ser minimo 6 caracteres').isLength({ min: 6 }),
            // para llamar el middleware y validar campos
            validarCampos
        ], 
        crearUsuario)
    ;
router.post('/', 
        [
            check('email', 'El email es obligatorio').isEmail(),
            check('password', 'El password debe ser minimo 6 caracteres').isLength({ min: 6 }),
            validarCampos
        ], 
        loginUsuario);

// Asi se exporta y asi exportamos route (auth)
module.exports = router;