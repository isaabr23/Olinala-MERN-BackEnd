const { response } = require('express');
const Admin = require('../models/admin')

const crearAdmin = async( req, res = response ) => {

    // const { email, password } = req.body;

    try {
        
        let admin = new Admin(req.body);
        
        await admin.save();
        
        res.status(201).json({
            ok: true,
            id: admin._id, // Se manda a front para acceder al id de la base de datos
            msg: 'Se agrego un nuevo Administrador',
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hablas con administrador'
        })
    }
}

const getAdmin = async(req, res = response) => {

    /* 
        Encuentra todos los admin que hay en Admin (DB), *populate* nos trae la informacion del usuario y lo coloca en el arbol
        y colocando un segundo argumento ponemos los campos que queremos en este caso solo sera "name", si quisieramos mas especificos seria "name password"
    */
    const admin = await Admin.find()
                                // .populate('user', 'name');

    res.json({
        ok: true,
        msg: 'getAdmin',
        admin
    });

}

const actualizarAdmin = async(req, res = response) => {

    // obtenemos el id del admin que nos da el moongose
    const adminId = req.params.id;
    // obtenemos el uid (id del usuario)
    const uid = req.uid;

    try {

        const admin = await Admin.findById( adminId )

        if( !admin ) {
            // status 404 = No existe
            return res.status(404).json({
                ok: false,
                msg: 'El Administrador no existe por ese id',
            });
        }

        // Si si existe el admin con el id correcto continuamos
        
        // Si es un usuario diferente al que creo el admin no podra actualizarlo
        // if ( admin.user.toString() !== uid ) {
        //     // status 401 no tiene permisos
        //     return res.status(401).json({
        //         ok: false,
        //         msg: 'No tiene privilegios de editar este admin'
        //     });
        // }

        // si llega aqui significa que es la misma persona que creo el admin
        // Se crea nuevo admin = admin actualizado
        const nuevoAdmin = {
            // destructuracion del admin 
            ...req.body,
            // y se agrega el uid
            user: uid
        }

        // Finalmente actualizamos                       (admin que quiero actualizar, lo que actualice, para que retorne lo que se cambio)
        const adminActualizado = await Admin.findByIdAndUpdate( adminId, nuevoAdmin, { new: true } )

        res.json({
            ok: true,
            admin: adminActualizado
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador...'
        });
    }
}

const borrarAdmin = async(req, res = response) => {

    // console.log('req.id', req.params.id)

    const adminId = req.params.id;
    // const adminIds = req.params._id;
    // const uid = req.uid;
    
    try {
        
        const admin = await Admin.findById( adminId )
        
        if( !admin ) {
            return res.status(404).json({
                ok: false,
                msg: 'El Administrador no existe por ese id',
            });
        }
        
        // if ( admin.user.toString() !== uid ) {
            //     return res.status(401).json({
                //         ok: false,
                //         msg: 'No tiene privilegios de eliminar este admin'
                //     });
                // }
                
                await Admin.findByIdAndDelete( adminId )
                
                res.json({
                    ok: true,
                    msg: 'Administrador eliminado',
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
            crearAdmin,
    getAdmin,
    actualizarAdmin,
    borrarAdmin
}