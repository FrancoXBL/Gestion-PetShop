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

router.get("/edit-article-id/:id", (req, res) =>{
  const lista = obtenerLista()
  const article = lista[req.params.id]
  res.render("editar-articulo-id", {article})
})

router.post("/edit-article-id", (req, res) =>{
  const data = req.body
  console.log("Data desde el backend", data)
})



module.exports = router;
