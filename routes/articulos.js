const router = require("express").Router();
const { send } = require("express/lib/response");
const { obtenerLista, actualizarLista, verificarYCrearArchivoExcel, actualizarCajaDiaria, obtenerCajaDiaria, fechaDeActualizacion, verificarYCrearArchivoExcelTotales } = require("../repositorio.articulos");
const lista = obtenerLista()
const ruta = verificarYCrearArchivoExcel()
const rutaTotales = verificarYCrearArchivoExcelTotales()
let ventasDiarias = obtenerCajaDiaria(ruta)
let totalVenta = 0
let sendList = obtenerCajaDiaria(rutaTotales)


router.get('/nueva-venta', (req, res) =>{
  const newList = [...lista]
  newList.sort((a, b) => {
    if(a.name > b.name){
      return 1
    }
    if(a.name < b.name){
      return -1
    }
    return 0
  })
  res.render('ventas', { newList })
})
router.get('/caja-diaria', (req, res) =>{
  listaReversa = [...ventasDiarias]
  listaReversa.reverse()
  sendListReversa = [...sendList]
  sendListReversa.reverse()
  res.render('caja-diaria', {listaReversa, ventasDiarias, sendListReversa, sendList})
})
router.post('/nueva-venta', (req, res) =>{
  const data = req.body
  const tipo = data.slice(-1)
  const listaTotal = [...data]
  listaTotal.pop()
  listaTotal.map((item) => {
    console.log(item.price)
    totalVenta = totalVenta + parseInt(item.price)
  })
  
  sendList.push({totalVenta:totalVenta, tipo:tipo[0].option})
  totalVenta = 0
  console.log(sendList)

  actualizarCajaDiaria(sendList, rutaTotales)

  data.map((item) => {
    let senditem = {...item, ...tipo[0]}
    ventasDiarias.push(senditem)
  })

  lista.map((itemLista, index) => {

    data.pop()
    data.map((itemData) => {
      if(itemData.name == itemLista.name && itemData.tipos == itemLista.tipo && itemData.peso == itemLista.peso && itemData.tipoMordida == itemLista.tipoMordida && itemLista.tipoEdad == itemData.tipoEdad){
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
  fechaDeActualizacion(newData)
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
router.get("/eliminar-venta-total/:id", (req, res) =>{
  const mostrarArticulosTotales = [...sendList]
  mostrarArticulosTotales.reverse()
  const venta = mostrarArticulosTotales[req.params.id]
  const id = {id:req.params.id}
  res.render("eliminar-venta-totales", {venta, id})
})

router.post("/eliminar-venta-total", (req, res) =>{
  const index = req.body.indexAEliminar
  sendList.reverse()
  sendList.splice(index, 1)
  sendList.reverse()

  actualizarCajaDiaria(sendList, rutaTotales)
})
router.get("/eliminar-venta/:id", (req, res) =>{
  const mostrarArticulos = [...ventasDiarias]
  mostrarArticulos.reverse()
  const venta = mostrarArticulos[req.params.id]
  const id = {id:req.params.id}
  res.render("eliminar-venta", {venta, id})
})

router.post("/eliminar-venta", (req, res) =>{
  const index = req.body.indexAEliminar
  ventasDiarias.reverse()
  ventasDiarias.splice(index, 1)
  ventasDiarias.reverse()


  actualizarCajaDiaria(ventasDiarias, ruta)
})

module.exports = router;
