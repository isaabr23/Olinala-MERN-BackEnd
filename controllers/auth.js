/* Este archivo es para controlar las funciones y que nuestro archivo auth que esta en Routes no tenga tanto codigo
    solo exportaremos las funciones al router
*/

/* REQ = es lo que el usuario solicita (User)
   RES = es lo que nosotros respondemos (Dev)
*/

/* Para tener el tipado de express (la ayuda al escribir) y se debe tener "res = response" para la ayuda */
const { response } = require('express');
const Usuario = require('../models/Usuario')

const crearUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        // Para saber si el correo que se ingresa ya existe en la base de datos
        let usuario = await Usuario.findOne({ email });
        
        if( usuario ) {

            return res.status(400).json({
                ok: false,
                msg: 'Este correo ya existe'
            });
        }
        
        usuario = new Usuario(req.body);
        
        await usuario.save();
        
        res.status(201).json({
            ok: true,
            msg: 'Registro',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablas con administrador'
        })
    }
}

const loginUsuario = async( req, res = response ) => {

    const { email, password } = req.body;

    try {
        
        const usuario = await Usuario.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe este email'
            });
        }
        
        if( password !== usuario.password ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        res.json({
            ok: true,
            msg: 'login',
            email,
            password
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
}

module.exports = {
    crearUsuario,
    loginUsuario
}