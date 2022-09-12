const express = require('express');
const { dbConnection } = require('./data_base/config');

require('dotenv').config();
const cors = require('cors');

const app = express();

// Conexion a la Base de Datos (9)
dbConnection();

// Para seguridad instalamos el CORS ** npm i cors **
app.use( cors() );

// Lectura y parseo del body (leer datos que nos envia el front (datos del usuario login o registro) y cambiarlo (parse) JSON) (8)
// se utiliza en controllers auth
app.use( express.json() );

// todo lo que el require exporte lo va a habilitar en la ruta '/api/auth'
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/producto', require('./routes/producto'));
app.use('/api/contacto', require('./routes/cliente'));

app.use( express.static('public') );



app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});