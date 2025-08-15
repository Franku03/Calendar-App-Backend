const path = require( 'path' ); //Importamos nuestro propio path

const express = require('express');
require('dotenv').config(); // Establecemos el paquete dotenv para usar variables de entorno
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Conexión a la Base de Datos
dbConnection();

// CORS
app.use(cors());

// ¿ MIDDLEWARES ?
// Middleware: función que se ejecuta cuando alguien hace una petición al servidor

// Directorio Público - 
// Establecemos el directorio público a través del middleware express.static
app.use( express.static('public') );

// Lectura y parseo del body
// las peticiones que vengan en formato json las voy a procesar aquí y voy a extraer su contenido
// Esto es para obtener en el body de la request la data pasada en formato json
app.use( express.json() );

// ¿ Rutas
// Meaning: todo lo que este archivo vaya a exportar './routes/auth' habilitalo para la ruta /api/auth
app.use('/api/auth', require('./routes/auth') );

// CRUD: eventos
app.use('/api/events', require('./routes/events'));

// Para servir las rutas del react Router (realemnte cualquier ruta que no esté anteriormente definida) 
// y evitar que express intente manejarlas por sí mismo
// Esto es porque naturalmente express intentará servir aquellas rutas que no definimos, de esta forma dejamos que React router tome el control
// El /*splat es la notación equivalente de * en express v5
app.use('/*splat', (req, res) => {
    // __dirname = Apuntar a donde está corriendo nuestra aplicación en este momento
    // luego, en el segundo parámetro le adjuntamos el public/index.html
    res.sendFile( path.join( __dirname , 'public/index.html') );
});


// Escuchar peticiones
app.listen( process.env.PORT , () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});