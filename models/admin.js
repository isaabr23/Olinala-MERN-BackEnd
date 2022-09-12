const { Schema, model } = require('mongoose')

const AdminSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    nivel: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
});

// Para eliminar el "__v": 0 y "__id" => a solo "id"
AdminSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    // le doy el nombre id al _id
    object.id = _id;
    return object;
})

module.exports = model('Admin', AdminSchema);