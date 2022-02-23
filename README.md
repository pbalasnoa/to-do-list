# AppTask [![Status: pause](https://img.shields.io/badge/Status-pause-yellow)](https://github.com/pbalasnoa/to-do-list/tree/deployment) [![License: MIT](https://img.shields.io/badge/License-MIT-lightgrey.svg)](https://opensource.org/licenses/MIT)

Web responsiva que funciona como un _To Do_, organizador de tareas. El diseño es inspirado en la app tasks de Google.

### :fire: Motivación

Este proyecto se hace con el fin de practicar el modelo CRUD y el uso de Firebase (autenticación, Cloud Firestore, Cloud Storage).

[DEMO AppTask](https://apptask.vercel.app/opening "Web AppTask")

![Vista previa de AppTask](https://firebasestorage.googleapis.com/v0/b/to-do-list-84dd6.appspot.com/o/readme%2Fpreview.png?alt=media&token=2839eb36-1da0-47dc-84ab-65a1b8c7c6ed "Vista previa de AppTask")

## Tecnologías

El proyecto es creado con:

- Node: 14.15.4
- React: 17.0.1
- Firebase: 8.2.1
- Date-fns: 2.23.0
- Vercel: 23.1.2
- HTML, CSS y JavaScript

## Estado del proyecto

El proyecto se encuentra en una versión inicial de lo que se espera como producto final. A continuación se en lista las funcionalidades que posee:

- [x] Registro e inicio de sesión con correo y contraseña.
- [x] Registro e inicio de sesión por medio de Google.
- [x] Subir y actualizar imagen de perfil.
- [x] crear, leer, actualizar y eliminar tareas.
- [ ] Crear varias listas de tarea.
- [x] Ordenar por fecha o por orden propio.
- [ ] Agregar subtareas a las tareas.
- [x] Agregar la vista 404.
- [ ] Recuperar contraseña.
- [ ] Agregar animaciones.

## Instalación

Sigue estos pasos parar correr localmente el proyecto

1. Clona este repositorio usando `git clone` o descargando el ZIP.
2. Ve a la carpeta del proyecto `cd to-do-list`.
3. Instala las dependencias con `npm install`.
4. Configura tus variables de entorno en un archivo **.env** para conectar con firebase.
5. Corre en ambiente local ejecutando `npm start`.
6. Disfruta de AppTask :blush:.

## Estructura de la base de datos

La base de datos maneja una colección users que contiene una subcolección task.

![Estructura de la base de datos](https://firebasestorage.googleapis.com/v0/b/to-do-list-84dd6.appspot.com/o/readme%2Fdb.png?alt=media&token=63d47ee3-9ca0-40b3-8343-da35c10d8d3c "vista de la estructura de la base de datos")

### Mensaje de la desarrolladora

Si llegaste hasta aquí por favor trae más :coffee: y :cookie:.

Sígueme en [![A_Balasnoa](https://img.shields.io/twitter/url?url=https%3A%2F%2Ftwitter.com%2FA_Balasnoa)](https://twitter.com/A_Balasnoa)
