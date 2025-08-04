// El nombre del archivo va en mayúscula porque viene a ser una Clase
const { Schema, model } = require('mongoose');

const UserSchema = Schema({

    name: {
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
        require: true
    }

});

// El model se llama User y el Schema que va a manejar es el UserSchema
// Luego Mongoose tomará el model y pondrá el nombre en plural para la colección dentro de la BD si no existía previamente
// Es decir la colección dentro de mern_calendar se llamará Users
module.exports = model('User', UserSchema);