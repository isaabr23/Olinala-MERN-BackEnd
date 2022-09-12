const { response } = require('express');
const Cliente = require('../models/cliente')

const crearCliente = async( req, res = response ) => {

    // const { email, password } = req.body;

    try {
        
        let cliente = new Cliente(req.body);
        
        await cliente.save();
        
        res.status(201).json({
            ok: true,
            id: cliente._id,
            msg: 'Se agrego un nuevo cliente',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablas con administrador'
        })
    }
}

const getCliente = async(req, res = response) => {

    /* 
        Encuentra todos los cliente que hay en Cliente (DB), *populate* nos trae la informacion del usuario y lo coloca en el arbol
        y colocando un segundo argumento ponemos los campos que queremos en este caso solo sera "name", si quisieramos mas especificos seria "name password"
    */
    const cliente = await Cliente.find()
                                // .populate('user', 'name');

    res.json({
        ok: true,
        msg: 'getCliente',
        cliente
    });

}

const actualizarCliente = async(req, res = response) => {

    // obtenemos el id del cliente que nos da el moongose
    const clienteId = req.params.id;
    // obtenemos el uid (id del usuario)
    const uid = req.uid;

    try {

        const cliente = await Cliente.findById( clienteId )

        if( !cliente ) {
            // status 404 = No existe
            return res.status(404).json({
                ok: false,
                msg: 'El cliente no existe por ese id',
            });
        }

        // Si si existe el cliente con el id correcto continuamos
        
        // Si es un usuario diferente al que creo el cliente no podra actualizarlo
        // if ( cliente.user.toString() !== uid ) {
        //     // status 401 no tiene permisos
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegios de editar este cliente'
        //     });
        // }

        // si llega aqui significa que es la misma persona que creo el cliente
        // Se crea nuevo cliente = cliente actualizado
        const nuevoCliente = {
            // destructuracion del cliente 
            ...req.body,
            // y se agrega el uid
            user: uid
        }

        // Finalmente actualizamos                       (cliente que quiero actualizar, lo que actualice, para que retorne lo que se cambio)
        const clienteActualizado = await Cliente.findByIdAndUpdate( clienteId, nuevoCliente, { new: true } )

        res.json({
            ok: true,
            cliente: clienteActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}

const borrarCliente = async(req, res = response) => {

    const clienteId = req.params.id;
    // const uid = req.uid;
    // console.log(uid)

    try {

        const cliente = await Cliente.findById( clienteId )

        if( !cliente ) {
            return res.status(404).json({
                ok: false,
                msg: 'El cliente no existe por ese id',
            });
        }

        // if ( cliente.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegios de eliminar este cliente'
        //     });
        // }

        await Cliente.findByIdAndDelete( clienteId )

        res.json({
            ok: true,
            msg: 'Cliente eliminado',
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}

module.exports = {
    crearCliente,
    getCliente,
    actualizarCliente,
    borrarCliente
}