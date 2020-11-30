const bdatos = require("../conexion");

const EncontrarDetallesCiudades = `SELECT CITIES.ID AS cityId,
CITIES.DESCRIPTION AS city,
COUNTRIES.ID AS countryId, COUNTRIES.DESCRIPTION AS countryDesc,
REGIONS.ID AS regionId, REGIONS.DESCRIPTION AS regionDesc
FROM CITIES CITIES
INNER JOIN COUNTRIES COUNTRIES
ON CITIES.COUNTRYID = COUNTRIES.ID
INNER JOIN REGIONS REGIONS
ON COUNTRIES.REGIONID = REGIONS.ID`;

const EncontrarTodos = async () => {
    return await bdatos.sequelize.query(EncontrarDetallesCiudades, {
      type: bdatos.sequelize.QueryTypes.SELECT,
    });
};

const EncontrarRegiones = async () => {
  return await bdatos.sequelize.query(`SELECT * FROM REGIONS`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const EncontrarRegionPorId = async (id) => {
    return await bdatos.sequelize.query(`SELECT * FROM REGIONS WHERE ID=${id};`, {
      type: bdatos.sequelize.QueryTypes.SELECT,
    });
};

const EncontrarRegionPorDescripcion = async (body) => {
  return await bdatos.sequelize.query(`SELECT * FROM REGIONS WHERE DESCRIPTION="${body.description}";`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const AgregarRegion = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO REGIONS (description) VALUES ("${body.description}");`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

const ActualizarRegion = async (body, id) => {
  return await bdatos.sequelize.query(
    `UPDATE REGIONS SET DESCRIPTION = "${body.description}" WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.UPDATE }
  );
};

const EliminarRegion = async (id) => {
  return await bdatos.sequelize.query(
    `DELETE FROM REGIONS WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.DELETE }
  );
};

const EncontrarTodosPaises = async () => {
  return await bdatos.sequelize.query(`SELECT * FROM COUNTRIES;`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const EncontrarPaisesPorRegionId = async (regionId) => {
    return await bdatos.sequelize.query(`SELECT * FROM COUNTRIES WHERE REGIONID=${regionId};`, {
      type: bdatos.sequelize.QueryTypes.SELECT,
    });
};

const EncontrarPaisPorDescripcion = async (body) => {
  return await bdatos.sequelize.query(`SELECT * FROM COUNTRIES WHERE DESCRIPTION="${body.description}";`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const AgregarPais = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO COUNTRIES (description, regionId) VALUES ("${body.description}", ${body.regionId});`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

const ActualizarPais = async (body, id) => {
  return await bdatos.sequelize.query(
    `UPDATE COUNTRIES SET DESCRIPTION = "${body.description}", REGIONID=${body.regionId} WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.UPDATE }
  );
};

const EliminarPais = async (id) => {
  return await bdatos.sequelize.query(
    `DELETE FROM COUNTRIES WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.DELETE }
  );
};

const EncontrarCiudadesPorPaisId = async (countryId) => {
  return await bdatos.sequelize.query(`SELECT * FROM CITIES WHERE COUNTRYID=${countryId};`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const EncontrarCiudadPorDescripcion = async (body) => {
  return await bdatos.sequelize.query(`SELECT * FROM CITIES WHERE DESCRIPTION="${body.description}";`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const AgregarCiudad = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO CITIES (description, countryId) VALUES ("${body.description}", ${body.countryId});`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

const ActualizarCiudad = async (body, id) => {
  return await bdatos.sequelize.query(
    `UPDATE CITIES SET DESCRIPTION = "${body.description}", COUNTRYID=${body.countryId} WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.UPDATE }
  );
};

const EliminarCiudad = async (id) => {
  return await bdatos.sequelize.query(
    `DELETE FROM CITIES WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.DELETE }
  );
};


module.exports = {

  EncontrarTodos,
  EncontrarRegiones,
  EncontrarRegionPorId,
  EncontrarRegionPorDescripcion,
  AgregarRegion,
  ActualizarRegion,
  EliminarRegion,
  EncontrarTodosPaises,
  EncontrarPaisesPorRegionId,
  EncontrarPaisPorDescripcion,
  AgregarPais,
  ActualizarPais,
  EliminarPais,
  EncontrarCiudadesPorPaisId,
  EncontrarCiudadPorDescripcion,
  AgregarCiudad,
  ActualizarCiudad,
  EliminarCiudad
    
};