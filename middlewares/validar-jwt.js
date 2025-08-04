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
        req.uid = uid;
        req.name = name;

    } catch (error) {
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