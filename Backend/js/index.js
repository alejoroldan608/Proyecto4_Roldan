const express = require('express');
const app = express();

app.use(express.json());
const port = 3000;


const helmet = require('helmet');
app.use(helmet.permittedCrossDomainPolicies({permittedPolicies: "by-content-type"}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    next();
});

const rutacompanias = require ('./rutas/companias');
const rutausuarios = require('./rutas/usuarios');
const rutacontactos = require('./rutas/contactos');
const rutaregciu = require ('./rutas/regciu')

app.use('/companias', rutacompanias);
app.use('/usuarios', rutausuarios);
app.use('/contactos', rutacontactos);
app.use('/regciu', rutaregciu);

app.listen(port, () => {
    console.log('Servidor corriendo por el puerto '+ port);
});
