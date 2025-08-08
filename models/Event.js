const { Schema, model } = require('mongoose');

const EventSchema = Schema({

    title: {
        type: String,
        required: true
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    user: {
        // Le decimos a Mongoose que este atributo será una referencia a un documento de tipo usuario, esto a través del Id del mismo
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

});

// Especificamos como queremos que se serialice el objeto al ser enviado en la respuesta sobreescribiendo el método toJSON
// Esto viene a ejecutarse cuando en el res.json() colocamos como atributos en la respuesta evento: eventoGuardado
// En ese momento mongoose llama al metodo to JSON para serializar el objeto, y en este caso ejecutamos esta modificación
// Para quitar el atributo de la version y modificar la clave del atributo id
// Utilizamos una función normal (con nombre) para poder utilizar el this, es decir, referenciarla dentro de ella misma
// * También se utiliza el patrón rest en la desestructuración para contener todo el resto de parámetros en un mismo objeto
EventSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
});


// El model se llama Event y el Schema que va a manejar es el EventSchema
// Luego Mongoose tomará el model y pondrá el nombre en plural para la colección dentro de la BD si no existía previamente
// Es decir la colección dentro de mern_calendar se llamará Events
module.exports = model('Event', EventSchema);

// ¿ NOTA: Si se llega a enviar alguna propiedad en el body que no esté contemplada en el schema
// ¿ Mongoose simplemente la ignora y no la coloca en el documento de la BD
// ¿ Solo trabaja con aquello que se le especifica en el modelo

// Patrón rest: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Functions/rest_parameters