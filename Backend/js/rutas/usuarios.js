const router = require("express").Router();

const { validarlogin, validacionContrasena } = require("../validaciones/validarusuario");

const jwt = require("jsonwebtoken");
const conexion = require("../basesdatos/conexion/usuarios");

const SECRET = "53cr3t_70k3n1d";

router.post("/login", validarlogin, async (req, res) => {
  try {
      const username = await conexion.EncontrarPorUsuario(req.body);

      const { pass } = req.body;

      if (!username.length) {
        res.status(401).json({ error: "Nombre de usuario no existe" });
      }
    
      if (username[0].password == pass) {
        const payload = {
          id: username[0].id,
          roleId: username[0].roleId,
          username: username[0].username
        }
        const token = jwt.sign(payload, SECRET);
        res.header("auth-token", token).json(token);
      } else {
        res.status(400).json({ error: "Credenciales incorrectas" });
      }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get("/", async (req, res) => {
  try {
    const usuarios = await conexion.EncontrarTodos();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let user = await conexion.EncontrarPorId(id);

    return res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/create', validacionContrasena, async (req, res)=>{
  try {
    const usuario = await conexion.EncontrarPorEmail(req.body);
    if (usuario.length) {
      return res.status(409).json({ error: "Usuario ya existe" });
    }
    await conexion.add(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await conexion.ActualizarUsuario(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await conexion.EliminarUsuario(id);

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;