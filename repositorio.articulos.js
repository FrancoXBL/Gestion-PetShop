const XLSX = require("xlsx");
const fs = require('fs');
const path = require('path');

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

function obtenerCajaDiaria(ruta) {
  const workbook = XLSX.readFile(ruta);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}

function obtenerCajaMensual(ruta) {
  const workbook = XLSX.readFile(ruta);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  const data = XLSX.utils.sheet_to_json(sheet);
  return data;
}

function actualizarLista(lista) {

  const workbook = XLSX.readFile("lista.xlsx");

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  for (const cellRef in sheet) {
    if (sheet.hasOwnProperty(cellRef)) {
      delete sheet[cellRef];
    }
  }
  
  XLSX.utils.sheet_add_json(sheet, lista)
  XLSX.writeFile(workbook, "lista.xlsx")

}


function actualizarClientes(lista) {

  const workbook = XLSX.readFile("clientes.xlsx");

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  for (const cellRef in sheet) {
    if (sheet.hasOwnProperty(cellRef)) {
      delete sheet[cellRef];
    }
  }
  
  XLSX.utils.sheet_add_json(sheet, lista)
  XLSX.writeFile(workbook, "clientes.xlsx")

}

function actualizarCajaDiaria(lista, ruta) {

  const workbook = XLSX.readFile(ruta);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  for (const cellRef in sheet) {
    if (sheet.hasOwnProperty(cellRef)) {
      delete sheet[cellRef];
    }
  }
  
  XLSX.utils.sheet_add_json(sheet, lista)
  XLSX.writeFile(workbook, ruta)

}

function verificarYCrearArchivoExcel() {
  const carpetaCajasDiarias = 'cajas-diarias';
  const fechaActual = new Date();
  const fechaFormato = fechaActual.toISOString().slice(0, 10)

  const nombreArchivo = `caja-${fechaFormato}.xlsx`;
  const rutaArchivo = path.join(__dirname, carpetaCajasDiarias, nombreArchivo);


  if (!fs.existsSync(rutaArchivo)) {

    const workbook = XLSX.utils.book_new();
    const hoja = XLSX.utils.aoa_to_sheet([['A']]);

    XLSX.utils.book_append_sheet(workbook, hoja, 'Hoja1')

    XLSX.writeFile(workbook, rutaArchivo);
    console.log(`Se ha creado el archivo "${nombreArchivo}".`);
  }
  return rutaArchivo
}

function verificarYCrearArchivoExcelTotales() {
  const carpetaCajasDiarias = 'cajas-diarias';
  const fechaActual = new Date();
  const fechaFormato = fechaActual.toISOString().slice(0, 10)

  const nombreArchivo = `totales-${fechaFormato}.xlsx`;
  const rutaArchivo = path.join(__dirname, carpetaCajasDiarias, nombreArchivo);


  if (!fs.existsSync(rutaArchivo)) {

    const workbook = XLSX.utils.book_new();
    const hoja = XLSX.utils.aoa_to_sheet([['A']]);

    XLSX.utils.book_append_sheet(workbook, hoja, 'Hoja1')

    XLSX.writeFile(workbook, rutaArchivo);
    console.log(`Se ha creado el archivo "${nombreArchivo}".`);
  }
  return rutaArchivo
}

function verificarYCrearArchivoExcelGastos() {
  const carpetaCajasDiarias = 'cajas-diarias';
  const fechaActual = new Date();
  const fechaFormato = fechaActual.toISOString().slice(0, 10)

  const nombreArchivo = `gastos-${fechaFormato}.xlsx`;
  const rutaArchivo = path.join(__dirname, carpetaCajasDiarias, nombreArchivo);


  if (!fs.existsSync(rutaArchivo)) {

    const workbook = XLSX.utils.book_new();
    const hoja = XLSX.utils.aoa_to_sheet([['A']]);

    XLSX.utils.book_append_sheet(workbook, hoja, 'Hoja1')

    XLSX.writeFile(workbook, rutaArchivo);
    console.log(`Se ha creado el archivo "${nombreArchivo}".`);
  }
  return rutaArchivo
}

function fechaDeActualizacion(data){
  const fechaActual = new Date();
  data.fechaActualizacion = fechaActual.toISOString().slice(0, 10)
}

function verificarYCrearArchivoExcelCajaMensual() {
  const carpetaCajasMensuales = 'cajas-mensuales';
  const fechaActual = new Date();
  const fechaFormato = fechaActual.getMonth()+1 + "-" + fechaActual.getFullYear()

  const nombreArchivo = `mes-${fechaFormato}.xlsx`;
  const rutaArchivo = path.join(__dirname, carpetaCajasMensuales, nombreArchivo);


  if (!fs.existsSync(rutaArchivo)) {

    const workbook = XLSX.utils.book_new();
    const hoja = XLSX.utils.aoa_to_sheet([['A']]);

    XLSX.utils.book_append_sheet(workbook, hoja, 'Hoja1')

    XLSX.writeFile(workbook, rutaArchivo);
    console.log(`Se ha creado el archivo "${nombreArchivo}".`);
  }
  return rutaArchivo
}

module.exports = {
  obtenerCajaMensual,
  verificarYCrearArchivoExcelCajaMensual,
  verificarYCrearArchivoExcelGastos,
  verificarYCrearArchivoExcelTotales,
  fechaDeActualizacion,
  obtenerCajaDiaria,
  actualizarCajaDiaria,
  verificarYCrearArchivoExcel,
  actualizarClientes,
  actualizarLista,
  obtenerLista,
  obtenerClientes,
};
