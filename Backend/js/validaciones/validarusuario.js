const jwt = require("jsonwebtoken");

const SECRET = "53cr3t_70k3n1d";
const ADMIN_IDROLE = 1;

const validarlogin = (req, res, next) => {
      try {
        const { usuario, contrasena } = req.body;
        if (!usuario || !contrasena)
            return res.status(400).json({ error: "Datos incompletos de Usuario o Contraseña" });
            next();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }   
};

const validacionContrasena = (req, res, next) => {
  try {
      const { password, rpassword } = req.body;
      if (!password || !rpassword) {
          return res.status(400).json({ error: "La contraseña es requerida" });
      } else {
          if (password != rpassword) {
              return res.status(400).json({ error: "Credenciales incorrectas" });
          } else {
              next();
          }
      }
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


module.exports = {

    validarlogin,
    validacionContrasena
    
};