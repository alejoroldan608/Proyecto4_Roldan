const bdatos = require("../conexion");

const BuscarDetalleCompania = `SELECT COMPANIES.ID AS companyId,
COMPANIES.NAME AS name, COMPANIES.ADDRESS AS address, COMPANIES.EMAIL AS email, COMPANIES.PHONE AS phone,
CITIES.ID AS cityId, CITIES.DESCRIPTION AS cityDesc
FROM COMPANIES COMPANIES
INNER JOIN CITIES CITIES
ON COMPANIES.CITYID = CITIES.ID`;

const EncontrarTodos = async () => {
    return await bdatos.sequelize.query(BuscarDetalleCompania, {
      type: bdatos.sequelize.QueryTypes.SELECT,
    });
};

const EncontrarPorEmail = async (body) => {
  return await bdatos.sequelize.query(`SELECT * FROM COMPANIES WHERE EMAIL = "${body.email}";`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const EncontrarPorId = async (id) => {
  return await bdatos.sequelize.query(`SELECT * FROM COMPANIES WHERE ID = "${id}";`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const Agregar = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO COMPANIES (name, address, email, phone, cityId) 
     VALUES ("${body.name}","${body.address}", "${body.email}", "${body.phone}", "${body.cityId}");`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

const Actualizarcompania = async (body, id) => {
  return await bdatos.sequelize.query(
    `UPDATE COMPANIES SET NAME="${body.name}", ADDRESS="${body.address}",
    EMAIL="${body.email}", PHONE="${body.phone}", CITYID=${body.cityId} WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.UPDATE }
  );
};

const EliminarCompania = async (id) => {
  return await bdatos.sequelize.query(
    `DELETE FROM COMPANIES WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
    EncontrarTodos,
    EncontrarPorEmail,
    EncontrarPorId,
    Agregar,
    Actualizarcompania,
    EliminarCompania
};