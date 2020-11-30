const router = require("express").Router();

const conexion = require("../basesdatos/conexion/regciu");
const { validarToken } = require("../validaciones/validarcontacto");




router.post('/regiones/crear', async (req, res)=>{
  try {
    const region = await conexion.EncontrarRegionPorDescripcion(req.body);
    if (region.length) {
      return res.status(409).json({ error: "Region ya existe" });
    }
    await conexion.AgregarRegion(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/regiones", validarToken, async (req, res) => {
  try {
    let regiones = await conexion.EncontrarRegiones();
    return res.json(regiones);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/regiones/:id", async (req, res) => {
  try {
    const { id } = req.params;

    let region = await conexion.EncontrarRegionPorId(id);

    return res.json(region);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



router.put("/regiones/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await conexion.ActualizarRegion(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/regiones/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await conexion.EliminarRegion(id);

    res.json({ message: "Region eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});









router.get("/Paises", async (req, res) => {
  try {
    let paises = await conexion.EncontrarTodosPaises();
    return res.json(paises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/paises/:regionid", async (req, res) => {
  try {
    const { regionid } = req.params;

    let paises = await conexion.EncontrarPaisesPorRegionId(regionid);
    return res.json(paises);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/paises/crear', async (req, res)=>{
  try {
    const pais = await conexion.EncontrarPaisPorDescripcion(req.body);
    if (pais.length) {
      return res.status(409).json({ error: "Pais ya existe" });
    }
    await conexion.AgregarPais(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/paises/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await conexion.ActualizarPais(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/paises/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await conexion.EliminarPais(id);

    res.json({ message: "Pais eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});






router.get("/ciudades", async (req, res) => {
  try {
    let ciudades = await conexion.EncontrarTodos();
    res.status(200).json(ciudades);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/ciudades/:paisid", async (req, res) => {
  try {
    const { paisid } = req.params;

    let ciudades = await conexion.EncontrarCiudadesPorPaisId(paisid);
    res.status(200).json(ciudades);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/ciudades/crear', async (req, res)=>{
  try {
    const ciudad = await conexion.EncontrarCiudadPorDescripcion(req.body);
    if (ciudad.length) {
      return res.status(409).json({ error: "Ciudad ya existe" });
    }
    await conexion.AgregarCiudad(req.body);
    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/ciudades/:id", async (req, res) => {
  try {
    const { id } = req.params;
      
    await conexion.ActualizarCiudad(req.body, id);

    res.json(req.body);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/ciudades/:id", async (req, res) => {
  try {
    const { id } = req.params;

    await conexion.EliminarCiudad(id);

    res.json({ message: "Ciudad eliminada" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;