const { Schema, model } = require('mongoose')

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Para eliminar el "__v": 0 y "__id" => a solo "id"
UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    // le doy el nombre id al _id
    object.id = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);