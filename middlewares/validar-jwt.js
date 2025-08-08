const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = ( req, res = response , next ) => {

    // * x-token en los headers
    const token = req.header('x-token');

    if( !token ) {
        // 401: Usuario no está autenticado
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        
        // * Se debe considerar que si se modifica el payload, se modifica toda la forma en que el token fue firmado
        // * Cualquier modificación al mismo invalida el token
        const { uid, name } =  jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );

        // Una vez validamos el token, colocamos los datos del mismo en el body de la request para así pasarlos a las siguientes funciones a través del next()
        // * Esto nos permitirá acceder al uid y nombre del usuario desde el objeto req en cualquier ruta que utilice este middleware, por ejemplo el POST en Events
        req.uid = uid;
        req.name = name;

    } catch (error) {
        // * Esto se puede tunear dejando esto en un archivo de texto plano con la hora en la que sucedió
        // * A su vez se puede añadir la dirección ip desde la que se hace para ponerla en una lista negra, pues alguien podría estar
        // * Intentando acceder a través de modificaciones en el token, pero esto solo en caso de que las modificaciones sean repetidas y necesitaramos bloquearlas 

        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }


    next();

}

module.exports = {
    validarJWT
}