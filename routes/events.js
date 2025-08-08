/* 
    Event Routes
    /api/events
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
} = require('../controllers/events');


const router = Router();

// ¿ Todas tienen que pasar por la validación del JWT
// Al hacer esto estoy diciendo: Cualquier petición que venga luego de esta línea debe tener su token en los headers
// Podriamos proteger ciertas peticiones y otras dejarlas públicas dependiendo de que dejamos antes de esta línea y que ponemos después
router.use( validarJWT );

// Obtener eventos
router.get('/' , getEvents);

// Crear un nuevo evento
router.post(
    '/' , 
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ], 
    createEvent);

// Actualizar un nuevo evento
router.put(
    '/:id',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'La Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    updateEvent);

// Borrar un nuevo evento
router.delete('/:id' ,deleteEvent);

module.exports = router;