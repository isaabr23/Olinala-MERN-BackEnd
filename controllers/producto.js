const { response } = require('express');
const Producto = require('../models/Producto')

const crearProducto = async( req, res = response ) => {

    // const { email, password } = req.body;

    try {

        
        let producto = new Producto(req.body);
        console.log(producto)
        
        await producto.save();
        
        res.status(201).json({
            ok: true,
            id: producto._id,
            msg: 'Se agrego un nuevo producto',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        })
    }
}


const getProducto = async(req, res = response) => {

    /* 
        Encuentra todos los producto que hay en Producto (DB), *populate* nos trae la informacion del usuario y lo coloca en el arbol
        y colocando un segundo argumento ponemos los campos que queremos en este caso solo sera "name", si quisieramos mas especificos seria "name password"
    */
    const producto = await Producto.find()
                                // .populate('user', 'name');

    res.json({
        ok: true,
        msg: 'getProducto',
        producto
    });

}

const actualizarProducto = async(req, res = response) => {

    // obtenemos el id del producto que nos da el moongose
    const productoId = req.params.id;
    // obtenemos el uid (id del usuario)
    const uid = req.uid;

    try {

        const producto = await Producto.findById( productoId )

        if( !producto ) {
            // status 404 = No existe
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe por ese id',
            });
        }

        // Si si existe el producto con el id correcto continuamos
        
        // Si es un usuario diferente al que creo el producto no podra actualizarlo
        // if ( producto.user.toString() !== uid ) {
        //     // status 401 no tiene permisos
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegios de editar este producto'
        //     });
        // }

        // si llega aqui significa que es la misma persona que creo el producto
        // Se crea nuevo producto = producto actualizado
        const nuevoProducto = {
            // destructuracion del producto 
            ...req.body,
            // y se agrega el uid
            user: uid
        }

        // Finalmente actualizamos                       (producto que quiero actualizar, lo que actualice, para que retorne lo que se cambio)
        const productoActualizado = await Producto.findByIdAndUpdate( productoId, nuevoProducto, { new: true } )

        res.json({
            ok: true,
            producto: productoActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}

const borrarProducto = async(req, res = response) => {

    const productoId = req.params.id;
    // const uid = req.uid;
    // console.log(uid)

    try {

        const producto = await Producto.findById( productoId )

        if( !producto ) {
            return res.status(404).json({
                ok: false,
                msg: 'El producto no existe por ese id',
            });
        }

        // if ( producto.user.toString() !== uid ) {
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegios de eliminar este producto'
        //     });
        // }

        await Producto.findByIdAndDelete( productoId )

        res.json({
            ok: true,
            msg: 'Producto eliminado',
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
    crearProducto,
    getProducto,
    actualizarProducto,
    borrarProducto
}