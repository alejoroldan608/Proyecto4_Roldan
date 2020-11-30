const router = require("express").Router();

const conexion = require("../basesdatos/conexion/companias");

const { validarToken } = require("../validaciones/validarcontacto");

router.get("/", validarToken, async (req, res) => {
    try {
      const companias = await conexion.EncontrarTodos();
      res.status(200).json(companias);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let compania = await conexion.EncontrarPorId(id);

    return res.json(compania);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/crear', async (req, res)=>{
  try {
    const compania = await conexion.EncontrarPorEmail(req.body);
    if (compania.length) {
      return res.status(409).json({ error: "La compañia ya existe" });
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
      
    await conexion.Actualizarcompania(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await conexion.EliminarCompania(id);

    res.json({ message: "Compañia eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;