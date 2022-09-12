const { Schema, model } = require('mongoose')

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    stock: {
        type: String,
        required: true,
    },
    comentario: {
        type: String,
        required: true,
    },
    precio: {
        type: String,
        required: true
    },
    imagenURL: {
        type: String,
    },
});

// Para eliminar el "__v": 0 y "__id" => a solo "id"
ProductoSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    // le doy el nombre id al _id
    object.id = _id;
    return object;
})

module.exports = model('Producto', ProductoSchema);