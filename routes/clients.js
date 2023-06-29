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
router.get("/edit-clientes", (req, res) => {
  res.render("editar-cliente", { clients });
});

module.exports = router;
