# Data Warehouse

Esta es una herramienta que permite a una compañía de Marketing administrar todos los contactos de sus clientes para sus campañas.

## Instalar Dependencias

Para instalar las dependencias, debes ejecutar en la terminal el comando:

```bash
npm install
```

## Conectarse a la base de datos

Iniciar sesión en MySQL Workbench las debidas credenciales. Las credenciales de entrada se deben configurar en el archivo index.js que se encuentra en la ruta:

```bash
..\PROYECTO4_ROLDAN\Backend\js\basesdatos\conexion.js
```
En la linea 4 se configuran los parámetros de conexión a la base de datos. Se deben ingresar con las debidas credenciales, que para este caso se deja de manera general como usuario "root" y contraseña "CONFIGURAR_CONTRASEÑA".


## Crear base de datos y sus tablas

En el archivo "DataWarehouse.sql", el cual se encuentra en la ruta:

```bash
..\PROYECTO4_ROLDAN\Backend\js\basesdatos\sentencias\DataWarehouse.sql
```
Se debe copiar todo su contenido, pegarlo en un nuevo SQL tab y ejecutarlo para obtener la base de datos y las respectivas tablas.

## Iniciar la aplicación

Desde la terminal, entrar a la carpeta js y ejecutar el comando:

```bash
node index.js
```
