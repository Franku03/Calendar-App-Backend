const jwt = require('jsonwebtoken');

const generateJWT = ( uid, name ) => {

    // ? Utilizamos Callbacks con promesas porque la librería por defecto trabaja es con callbacks
    return new Promise( ( resolve, reject ) => {

        const payload = { uid, name };

        // Colocamos el payload en el token y firmamos con nuestra palabra secreta
        // Luego especificamos detalles como la duración del token
        // Por último pasamos el callback en el cual devolvemos error si no se pudo generar el token, o el token si todo salió bien
        jwt.sign( payload, process.env.SECRET_JWT_SEED, {

            expiresIn: '2h',

        }, (err, token) => {

            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        });

    });

}


module.exports = {
    generateJWT,
}