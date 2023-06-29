const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const nombreEmpresa = 'El Cardenal'
  res.render("index", {nombreEmpresa});
});


module.exports = router;
