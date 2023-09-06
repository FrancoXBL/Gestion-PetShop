const { Router } = require("express");
const { obtenerClientes, actualizarClientes, fechaDeActualizacion } = require("../repositorio.articulos");
const clients = obtenerClientes();
const router = Router();

router.get("/new-clientes", (req, res) => {
  res.render("nuevo-cliente");
});
router.post("/new-clientes", (req, res) => {
  const data = req.body;
  console.log(data);
  clients.push(data)
  clients.map((item, index) =>{
    item.id = index + 1
  })
  actualizarClientes(clients)
});

router.get("/edit-clientes", (req, res) => {
  res.render("editar-cliente", { clients });
});

router.get("/editar-cliente-id/:id", (req, res) => {
  console.log(clients)
  const id = parseInt(req.params.id) + 1
  clients.map((client) => {
    if(client.id == id) {
      console.log("Cliente a editar", client)
      res.render("editar-cliente-id", { client });
    }
  })
});

router.get("/eliminar-cliente-id/:id", (req, res) => {
  const client = clients[req.params.id];
  console.log("cliente a eliminar", client);
  res.render("eliminar-cliente-id", { client });
});

router.post("/delete-client-id", (req, res) => {
  const data = req.body
  const index = parseInt(data.id)
  clients.splice(index-1, 1)
  clients.map((item, index) => {
    item.id = index + 1
  })
  actualizarClientes(clients)
})
router.post("/editar-cliente-id", (req, res) => {
  const data = req.body;
  fechaDeActualizacion(data)
  clients.map((item, index) => {
    if(data.id == index + 1){
      clients[index] = data
    }
  })
  actualizarClientes(clients)
});

module.exports = router;
