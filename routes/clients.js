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
  clients.push(data)
  clients.map((item, index) =>{
    item.id = index + 1
  })
  console.log("Nueva lista", clients)
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

router.get("/eliminar-cliente-id/:id", (req, res) => {
  const client = clients[req.params.id];
  console.log("cliente a eliminar", client);
  res.render("eliminar-cliente-id", { client });
});

router.post("/delete-client-id", (req, res) => {
  console.log(clients)
  const data = req.body
  const index = parseInt(data.id)
  const elementoAEliminar = clients[index - 1]
  console.log("Data desde el backend", elementoAEliminar)
  clients.splice(index-1, 1)
  clients.map((item, index) => {
    item.id = index + 1
  })
})
router.post("/editar-cliente-id", (req, res) => {
  const data = req.body;
});

module.exports = router;
