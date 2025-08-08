const { response } = require('express');
const Evento = require('../models/Event');

const getEvents = async ( req, res = response ) => {

    const eventos = await Evento.find()
                                .populate('user', 'name'); // En el segundo param mandamos los atributos que queremos ver separados por espacios: 'name password'

    res.status(200).json({
        ok: true,
        eventos
    }); 
};

const createEvent = async ( req, res = response ) => {

    // verificar que tenga el evento
    const evento = new Evento( req.body );

    try {

        evento.user = req.uid;
        
        const eventoGuardado = await evento.save();

        res.status(201).json({
            ok: true,
            evento: eventoGuardado
        });

    } catch (error) {
        // ! Esto se puede tunear dejando esto en un archivo de texto plano con la hora en la que sucedió
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

};

const updateEvent = async ( req, res = response ) => {

    const eventoId = req.params.id; // id del evento
    const uid = req.uid; // id del usuario

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ){
            // 404: Resource not found
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento solicitado'
            });
        }

        if ( evento.user.toString() !== uid ) {
            // 401: Unauthorized - El usuario que está editando el evento no es su propietario
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: uid // Colocamos el id en la respuesta porque este no vienve en el body de la petición
        }

        // id del evento que quiero guardar, nueva data del evento, configuraciones adicionales: new -> retornar el doc actualizado y no el viejo
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

        res.status(200).json({
            ok: true,
            evento: eventoActualizado
        }); 

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    } 
    


};

const deleteEvent = async ( req, res = response ) => {

    const eventoId = req.params.id; // id del evento
    const uid = req.uid; // id del usuario

    try {

        const evento = await Evento.findById( eventoId );

        if( !evento ){
            // 404: Resource not found
            return res.status(404).json({
                ok: false,
                msg: 'No existe el evento solicitado'
            });
        }

        if ( evento.user.toString() !== uid ) {
            // 401: Unauthorized - El usuario que está editando el evento no es su propietario
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio para eliminar este evento'
            });
        }

        await Evento.findByIdAndDelete( eventoId );

        res.status(200).json({
            ok: true,
        }); 

        
    } catch (error) {
        console.log( error );
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
};


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};