const Sequelize = require("sequelize");
require('dotenv').config();
const bdatos = {};

const sequelize = new Sequelize("DataWarehouse", "root", "CONFIGURAR_CONTRASEÑA", {
  dialect: "mysql",
  host: "127.0.0.1"
});

sequelize.authenticate().then(() => {
  console.log('Conexion exitosa');
}).catch(error => {
  console.log(error);
});

bdatos.sequelize = sequelize;

module.exports = bdatos;