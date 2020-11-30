const bdatos = require("../conexion");

const EncontrarPorUsuario = async (body) => {
  return await bdatos.sequelize.query(
      `SELECT * FROM USERS WHERE USERNAME = "${body.username}";`,
      { type: bdatos.sequelize.QueryTypes.SELECT });
};

const EncontrarPorEmail = async (body) => {
  return await bdatos.sequelize.query(`SELECT * FROM USERS WHERE EMAIL = "${body.email}";`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const EncontrarTodos = async () => {
  return await bdatos.sequelize.query(`SELECT USERS.ID AS userId,
    USERS.USERNAME AS username, USERS.NAME AS name, USERS.LAST_NAME AS last_name, USERS.EMAIL AS email,
    ROLES.ID AS roleId, ROLES.DESCRIPTION AS role
    FROM USERS USERS
    INNER JOIN ROLES ROLES
    ON USERS.ROLEID = ROLES.ID`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const EncontrarPorId = async (id) => {
  return await bdatos.sequelize.query(`SELECT * FROM USERS WHERE ID = "${id}";`, {
    type: bdatos.sequelize.QueryTypes.SELECT,
  });
};

const Agregar = async (body) => {
  return await bdatos.sequelize.query(
    `INSERT INTO USERS (username, name, last_name, email, password, roleId) 
     VALUES ("${body.username}","${body.name}","${body.last_name}","${body.email}", "${body.password}", "${body.roleId}");`,
    { type: bdatos.sequelize.QueryTypes.INSERT }
  );
};

const ActualizarUsuario = async (body, id) => {
  return await bdatos.sequelize.query(
    `UPDATE USERS SET USERNAME = "${body.username}", NAME="${body.name}", LAST_NAME="${body.last_name}",
    EMAIL="${body.email}", PASSWORD="${body.password}", ROLEID=${body.roleId} WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.UPDATE }
  );
};

const EliminarUsuario = async (id) => {
  return await bdatos.sequelize.query(
    `DELETE FROM USERS WHERE ID = ${id};`,
    { type: bdatos.sequelize.QueryTypes.DELETE }
  );
};




module.exports = {

  EncontrarPorUsuario,
  EncontrarPorEmail,
  EncontrarTodos,
  EncontrarPorId,
  Agregar,
  ActualizarUsuario,
  EliminarUsuario
    
}

