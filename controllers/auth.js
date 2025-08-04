const { response } = require('express'); // Para obtener el tipado del intellisense en el objeto response
// express.response
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

// req -> lo que la persona solicita o envía
// res -> Lo que devolvemos
// el body nos llega gracias al middleware del index.js express.json()

const createUser = async (req, res = response ) => {

    const { email, password } = req.body;

    try {

        // Verificar si el correo ya existe en la BD
        let usuario = await User.findOne({ email });

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Ya existe un usuario con este correo'
            })
        }

        usuario = new User( req.body );

        // Encriptar la contraseña
        const salt = bcrypt.genSaltSync(  );
        usuario.password = bcrypt.hashSync( password, salt );

        // Guardar el documento en la BD
        await usuario.save();
    
        // Generar nuestro JWT
        const token = await generateJWT( usuario.id, usuario.name );

        // aquí no hace falta el return porque es la última línea de la función
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }

}

const loginUser = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verificar si el correo ya existe en la BD
        const usuario = await User.findOne({ email });

        if( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe un usuario con ese email'
            })
        }

        // Confirmar los password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar nuestro JWT
        const token = await generateJWT( usuario.id, usuario.name );

        res.status(200).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
    
};

const revalidateToken = async (req, res = response) => {

    const { uid, name } = req;

    // generar un nuevo JWT y retornarlo en esta petición
    const token = await generateJWT( uid, name );

    res.status(200).json({
        ok: true,
        token
    });
};

module.exports = {
    createUser,
    loginUser,
    revalidateToken,
}





/*
    const createUser = (req, res = response ) => {

        const { name, email, password } = req.body;

        if ( name.length < 5 ) {
            // debemos colocar return para evitar el error de header sent (ocurre al intentar enviar un res luego de otro res)
            // solo se puede enviar una respuesta una única vez
            return res.status(400).json({
                ok: false,
                msg: 'El nombre de ser de 5 letras'
            })
        }
    
        // aquí no hace falta el return porque es la última línea de la función
        res.json({
            ok: true,
            msg: 'registro',
            name, 
            email,
            password
        });
    }
*/