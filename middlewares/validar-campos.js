/*  se crea un middleware para hacerlo mas compacto, podremos "validarCampos" abajo de cada router
    router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser minimo 6 caracteres').isLength({ min: 6 }),
    ], 
    crearUsuario);
*/

const { response } = require('express');
const { validationResult } = require('express-validator');

const validarCampos = ( req, res= response, next ) => {

    // Manejo de errores en caso de que el check se active en auth routes
    const errors = validationResult( req );
    if( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
                        // es de express-validator (mapped()) para distribuir el arbol de error (check de auth.js router)
            errors: errors.mapped()
        });
    }
 
    /* Cada que ve un check (auth.js routes) hara un next para validar el siguiente campo (name, email, password),
    si todo esta correcto hace un ultimo next a validarCampos */
    next();
}

module.exports = {
    validarCampos
}