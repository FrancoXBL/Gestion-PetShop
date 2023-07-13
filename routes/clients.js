const { Router } = require("express");
const { obtenerClientes } = require("../repositorio.articulos");
const clients = obtenerClientes();
const router = Router();

router.get("/clientes", (req, res) => {
  res.render("clientes");
});
router.get("/new-clientes", (req, res) => {
  res.render("nuevo-cliente");
});
router.post("/new-clientes", (req, res) => {
  const data = req.body;
  console.log(data);
});
router.get("/edit-clientes", (req, res) => {
  res.render("editar-cliente", { clients });
});
router.get("/editar-cliente-id/:id", (req, res) => {
  const lista = obtenerClientes();
  const client = lista[req.params.id];
  console.log(client);
  res.render("editar-cliente-id", { client });
});
router.post("/editar-cliente-id", (req, res) => {
  const data = req.body;
});

module.exports = router;
