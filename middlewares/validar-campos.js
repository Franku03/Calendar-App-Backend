// Esto es custom middleware para validar la respuesta a enviar según los datos que contiene el body en la requesta

const { response } = require('express');
const { validationResult } = require('express-validator');

// next = callback que se llama si todo el middleware se ejecuta correctamente
// Este next se llama de manera interna en cada uno de los checks definidos en la ruta
// Eventualmente, el último next en ser da paso a la ejecución del controlador

const validarCampos = ( req, res = response , next ) => {

    // manejo de errores
    const errors = validationResult ( req );

    if ( !errors.isEmpty() ){
        // retornamos un error, y al no llamar al next detenemos la ejecución aquí
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        })
    }

    // Si no hay ningún error, llama al next para dar paso al siguiente check o al controlador según sea el caso
    next();
}

module.exports = {
    validarCampos,
}