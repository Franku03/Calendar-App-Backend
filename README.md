# Backend MERN - Calendar 
### (Mongo + Express + React + Node) 👩‍💻

## Dev

1. Instalar dependencias `npm install`
2. Clonar el archivo `.env.template` y renombrarlo a `.env`
3. Cambiar las variables de entorno acorde a tu configuración
4. Correr el servidor `npm start`

## Registro y Generar JWT

1. Si no estamos registrados, acceder al endpoint `/api/auth/new` y proveer en un archivo JSON
     `
      {
          "name": "",
          "email": "",
          "password": ""
      }
     `
   Al registrarnos obtendremos nuestro token para acceder a los endpoints de eventos
3. Si ya estamos registrados entramos al endpoint `/api/auth/` enviando nuestro email y password en un JSON para regenerar el token 
