const router = require("express").Router();
const { obtenerLista } = require("../repositorio.articulos");

router.get("/articulos", (req, res) => {
  res.render("articulos");
});

router.get("/new-article", (req, res) => {
  res.render("nuevo-articulo");
});

router.post("/new-article", (req, res) => {
  const newData = req.body
  console.log(newData)
});

router.get("/edit-article", (req, res) => {
  const lista = obtenerLista();
  res.render("editar-articulo", { lista });
});

module.exports = router;
