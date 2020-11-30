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

const rutausuario = require('./rutas/usuarios');
const rutaproducto = require('./rutas/productos');
const rutapedidos = require ('./rutas/pedidos')
app.use('/api/usuarios', rutausuario);
app.use('/api/productos', rutaproducto);
app.use('/api/pedidos', rutapedidos);

app.listen(port, () => {
    console.log('Servidor corriendo por el puerto '+ port);
});
