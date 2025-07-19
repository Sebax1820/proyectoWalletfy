#Walletfy

Walletfy es una página construida con React que te permite registrar tus ingresos y gastos personales, los cuales se van a agrupar por meses. Para poder registrar tus eventos, debes utilizar el botón Add Event, donde podrás crear tu evento y seleccionar si es un ingreso o un gasto.

Una vez creado tu evento podrás editarlo o eliminarlo si es necesario, para esto debes dar click al evento que desees modificar y cambiar lo que necesites en el formulario.

Otra funcionalidad de Walletfy es establecer un dinero inicial, el cual se verá reflejado en el balance global.

---

##Estructura

La aplicacioón se encuentra dividida en cuatro partes principales:

---

###Routes
Son las rutas de la página web que será visible para el cliente, las cuales estan construidas con Tanstack Router.

####/form/$id
En esta ruta se encuentra el código para el funcionamiento adecuado del formulario para los eventos, el cual cuenta con un modo de creación para eventos nuevos, y uno de edición para eventos ya creados.

####/index
Esta es la ruta principal, la página de incio donde se mostraran todos los eventos y las funciones de la página.

---

###Components
En esta carpeta se encuentran los componentes que fueron utilizados para hacer una página eficiente y funcional.

---

###Types
Aquí se encuentra la estructura que van a tener los eventos, la cual esta definida con zod.

---

##Ejecución
Para ejecutar la página de manera local, solo hay que ejecutar los siguientes comandos en la terminal:

- Ejecuta `npm install`
- Inicia con `npm run dev`





