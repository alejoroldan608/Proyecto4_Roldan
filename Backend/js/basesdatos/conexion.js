const Sequelize = require("sequelize");

const bdatos = {};

const sequelize = new Sequelize("DataWarehouse", "root", "CONFIGURAR_CONTRASEÑA", {
  dialect: "mysql",
  host: "localhost"
});

sequelize.authenticate().then(() => {
  console.log('Conexion exitosa');
}).catch(error => {
  console.log(error);
});

bdatos.sequelize = sequelize;

module.exports = bdatos;