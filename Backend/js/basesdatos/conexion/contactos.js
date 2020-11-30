const bdatos = require("../conexion");

const EncontrarDetalleContactos = `SELECT CONTACTS.ID AS contactsId,
CONTACTS.FULL_NAME AS full_name, CONTACTS.EMAIL AS email, CONTACTS.POSITION AS position, CONTACTS.FAV_CHANNEL AS fav_channel, CONTACTS.INTEREST AS interest,
CITIES.ID AS cityId, CITIES.DESCRIPTION AS city,
COMPANIES.ID AS companyId, COMPANIES.NAME AS company
FROM CONTACTS CONTACTS
INNER JOIN CITIES CITIES
ON CONTACTS.CITYID = CITIES.ID
INNER JOIN COMPANIES COMPANIES
ON CONTACTS.COMPANYID = COMPANIES.ID`;

const EncontrarTodos = async () => {
  return await bdatos.sequelize.query(EncontrarDetalleContactos, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const EncontrarPorEmail = async (body) => {
  return await bdatos.sequelize.query(`SELECT * FROM CONTACTS WHERE EMAIL = "${body.email}";`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const EncontrarContactoPorId = async (id) => {
  return await bdatos.sequelize.query(`${EncontrarDetalleContactos} WHERE CONTACTS.id = ${id};`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const Agregar = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO CONTACTS (full_name, email, cityId, companyId, position, fav_channel, interest) 
     VALUES ("${body.full_name}","${body.email}","${body.cityId}","${body.companyId}", "${body.position}", "${body.fav_channel}", ${body.interest});`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

const ActualizarContacto = async (body, id) => {
  return await bdatos.sequelize.query(
    `UPDATE CONTACTS SET FULL_NAME = "${body.full_name}", EMAIL="${body.email}", CITYID=${body.cityId},
    COMPANYID=${body.companyId}, POSITION="${body.position}", FAV_CHANNEL="${body.fav_channel}",
    INTEREST="${body.interest}" WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.UPDATE }
  );
};

const EliminarContacto = async (id) => {
  return await bdatos.sequelize.query(
    `DELETE FROM CONTACTS WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.DELETE }
  );
};

module.exports = {
    EncontrarTodos,
    EncontrarContactoPorId,
    EncontrarPorEmail,
    Agregar,
    ActualizarContacto,
    EliminarContacto
};