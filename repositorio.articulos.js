const XLSX = require("xlsx");
function obtenerLista() {
  const workbook = XLSX.readFile("lista.xlsx");

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}

function obtenerClientes() {
  const workbook = XLSX.readFile("clientes.xlsx");

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}

module.exports = {
  obtenerLista,
  obtenerClientes,
};
