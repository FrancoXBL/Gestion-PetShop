const router = require("express").Router();
const { obtenerLista } = require("../repositorio.articulos");
const lista = obtenerLista()

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
  res.render("editar-articulo", { lista });
});

router.get("/edit-article-id/:id", (req, res) =>{
  const article = lista[req.params.id]
  res.render("editar-articulo-id", {article})
})

router.post("/edit-article-id", (req, res) =>{
  const data = req.body
  console.log("Data desde el backend", data)
})

router.get("/delete-article-id/:id", (req, res) =>{
  const article = lista[req.params.id]
  res.render("eliminar-articulo-id", {article})
})

// A CORREGIRRR 

router.post("/delete-article-id", (req, res) =>{
  const data = req.body
  const index = parseInt(data.id)
  const elementoAEliminar = lista[index - 1]
  console.log("Data desde el backend", elementoAEliminar)
  lista.splice(index-1, 1)
  lista.map((item, index) => {
    item.id = index + 1
  })
  console.log("nueva lsita", lista)
})

// A CORREGIRRR



module.exports = router;
