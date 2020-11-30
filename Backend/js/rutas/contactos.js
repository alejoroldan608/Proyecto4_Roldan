const router = require("express").Router();

const { validarToken } = require("../validaciones/validarcontacto");

const conexion = require("../basesdatos/conexion/contactos");

router.get("/", validarToken, async (req, res) => {
  try {
    const contactos = await conexion.EncontrarTodos();
    res.status(200).json(contactos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let contacto = await conexion.EncontrarContactoPorId(id);

    return res.json(contacto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/add', async (req, res)=>{
  try {
    const contacto = await conexion.EncontrarPorEmail(req.body);
    if (contacto.length) {
      return res.status(409).json({ error: "El contacto ya existe" });
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
      
    await conexion.ActualizarContacto(req.body, id);
    
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await conexion.EliminarContacto(id);

    res.json({ message: "Contacto eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = router;