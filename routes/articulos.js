const router = require("express").Router();
const { obtenerLista, actualizarLista, verificarYCrearArchivoExcel, actualizarCajaDiaria, obtenerCajaDiaria, fechaDeActualizacion } = require("../repositorio.articulos");
const lista = obtenerLista()
const ruta = verificarYCrearArchivoExcel()
let ventasDiarias = obtenerCajaDiaria(ruta)

router.get('/nueva-venta', (req, res) =>{
  res.render('ventas')
})
router.get('/caja-diaria', (req, res) =>{
  res.render('caja-diaria', {ventasDiarias})
})
router.post('/nueva-venta', (req, res) =>{
  const data = req.body
  const tipo = data.slice(-1)
  data.map((item) => {
    let senditem = {...item, ...tipo[0]}
    ventasDiarias.push(senditem)
  })

  lista.map((itemLista, index) => {

    data.pop()
    data.map((itemData) => {
      if(itemData.name == itemLista.name && itemData.tipos == itemLista.tipo && itemData.peso == itemLista.peso){
        lista[index].stock -= 1
      }
    })
    actualizarLista(lista)
  })
  ventasDiarias.pop()
  actualizarCajaDiaria(ventasDiarias, ruta)
})

router.get("/new-article", (req, res) => {
  res.render("nuevo-articulo");
});

router.post("/new-article", (req, res) => {
  const newData = req.body
  lista.push(newData)
  lista.map((item, index) => {
    item.id = index + 1
  })
  actualizarLista(lista)
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
  fechaDeActualizacion(data)
  lista.map((item, index) => {
    if(data.id == index + 1){
      lista[index] = data
    }
  })
  actualizarLista(lista)
})

router.get("/delete-article-id/:id", (req, res) =>{
  const article = lista[req.params.id]
  res.render("eliminar-articulo-id", {article})
})

router.post("/delete-article-id", (req, res) =>{
  const data = req.body
  const index = parseInt(data.id)

  lista.splice(index-1, 1)

  lista.map((item, index) => {
    item.id = index + 1
  })

  actualizarLista(lista)
  
})

module.exports = router;
