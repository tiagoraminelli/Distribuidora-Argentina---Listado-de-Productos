const productos = [
  { nombre: "Aceite de Girasol", precio: 1200, stock: 40, categoria: "Almacén" },
  { nombre: "Yerba Mate", precio: 900, stock: 25, categoria: "Bebidas" },
  { nombre: "Harina 000", precio: 500, stock: 80, categoria: "Almacén" },
  { nombre: "Cerveza", precio: 1000, stock: 50, categoria: "Bebidas" },
  { nombre: "Café", precio: 800, stock: 30, categoria: "Bebidas" },
  { nombre: "Leche", precio: 600, stock: 60, categoria: "Bebidas" },
  { nombre: "Pan", precio: 400, stock: 70, categoria: "Almacén" },
  { nombre: "Coca-Cola", precio: 800, stock: 55, categoria: "Bebidas" },
  { nombre: "Fanta", precio: 800, stock: 45, categoria: "Bebidas" },
  { nombre: "Sprite", precio: 800, stock: 35, categoria: "Bebidas" },
    { nombre: "Galletitas", precio: 300, stock: 90, categoria: "Almacén" },
    { nombre: "Azúcar", precio: 400, stock: 65, categoria: "Almacén" },
    { nombre: "Sal", precio: 200, stock: 100, categoria: "Almacén" },
    { nombre: "Arroz", precio: 700, stock: 75, categoria: "Almacén" },
    { nombre: "Pasta", precio: 600, stock: 85, categoria: "Almacén" },
    { nombre: "Atún en lata", precio: 900, stock: 30, categoria: "Frizados" },
    { nombre: "Pollo congelado", precio: 1500, stock: 20, categoria: "Frizados" },
    { nombre: "Pescado congelado", precio: 1800, stock: 15, categoria: "Frizados" },
    { nombre: "Verduras congeladas", precio: 700, stock: 40, categoria: "Frizados" },
    { nombre: "Helado", precio: 1200, stock: 25, categoria: "Frizados" },
    { nombre: "Queso", precio: 1000, stock: 50, categoria: "Lácteos" },
    { nombre: "Yogur", precio: 600, stock: 60, categoria: "Lácteos" },
    { nombre: "Manteca", precio: 500, stock: 70, categoria: "Lácteos" },
    { nombre: "Leche", precio: 400, stock: 80, categoria: "Lácteos" },
  // ...más
];


let productosFiltrados = [...productos];
let paginaActual = 1;
const productosPorPagina = 10;

function mostrarProductos() {
  const lista = document.getElementById("listado-productos");
  lista.innerHTML = "";

  const inicio = (paginaActual - 1) * productosPorPagina;
  const fin = inicio + productosPorPagina;
  const paginados = productosFiltrados.slice(inicio, fin);
paginados.forEach((producto, index) => {

        const li = document.createElement("li");
        li.textContent = `${inicio + index + 1}. ${producto.nombre} - $${producto.precio} - Stock: ${producto.stock} - Categoría: ${producto.categoria}`;
        lista.appendChild(li);


    });

  generarPaginacion();
}

function generarPaginacion() {
  const paginacion = document.getElementById("paginacion");
  paginacion.innerHTML = "";

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  for (let i = 1; i <= totalPaginas; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = i === paginaActual ? "active" : "";
    btn.onclick = () => {
      paginaActual = i;
      mostrarProductos();
    };
    paginacion.appendChild(btn);
  }
}



document.getElementById("buscador").addEventListener("input", e => {
  const texto = e.target.value.toLowerCase();

  productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(texto) ||
    p.categoria.toLowerCase().includes(texto) ||
    p.precio.toString().toLowerCase().includes(texto) ||
    p.stock.toString().toLowerCase().includes(texto)
  );

  paginaActual = 1;
  mostrarProductos();
});


document.getElementById("inputExcel").addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const primeraHoja = workbook.SheetNames[0];
    const hoja = workbook.Sheets[primeraHoja];

    // Convierte hoja a array de objetos
    const datos = XLSX.utils.sheet_to_json(hoja);

    // Formatea y carga
    datos.forEach(p => {
      if (p.Producto && p.Precio && p.Stock && p.Categoría) {
        productos.push({
          nombre: p.Producto,
          precio: parseFloat(p.Precio),
          stock: parseInt(p.Stock),
          categoria: p.Categoría
        });
      }
    });

    // Actualizar vista
    productosFiltrados = [...productos];
    paginaActual = 1;
    mostrarProductos();
  };

  reader.readAsArrayBuffer(file);
});




// Exportar PDF

function exportarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const logoBase64 = "data:image/png;base64,..."; // opcional

  const fecha = new Date().toLocaleString("es-AR");
  doc.setFontSize(14);
  doc.setTextColor(40, 40, 100);
  doc.text("Listado de Productos - Distribuidora Argentina", 10, 15);
  doc.setFontSize(10);
  doc.text(`Fecha de generación: ${fecha}`, 10, 22);

  // Agregar logo si tenés uno
  // doc.addImage(logoBase64, "PNG", 150, 10, 40, 15);

  const rows = productosFiltrados.map((p, i) => [
    i + 1,
    p.nombre,
    `$${p.precio}`,
    p.stock,
    p.categoria
  ]);

  doc.autoTable({
    startY: 30,
    head: [["#", "Producto", "Precio", "Stock", "Categoría"]],
    body: rows,
    theme: 'striped',
    headStyles: { fillColor: [0, 123, 255] },
    alternateRowStyles: { fillColor: [240, 248, 255] },
  });

  doc.save("productos.pdf");
}


// Exportar Excel
function exportarExcel() {


  const wb = XLSX.utils.book_new();

const fecha = new Date().toLocaleString("es-AR");
const encabezado = [
  [`Listado de Productos - Distribuidora Argentina`],
  [`Fecha de exportación:' ${fecha}`]
];

const datos = productosFiltrados.map((p, i) => [i + 1, p.nombre, p.precio, p.stock, p.categoria]);
const columnas = [["#", "Producto", "Precio", "Stock", "Categoría"]];
const ws = XLSX.utils.aoa_to_sheet([...encabezado, ...columnas, ...datos]);


  // Estilo (solo visible en programas como Excel, no en Google Sheets)
  ws["A1"].s = {
    font: { bold: true, sz: 14, color: { rgb: "003366" } }
  };

  XLSX.utils.book_append_sheet(wb, ws, "Productos");
  XLSX.writeFile(wb, "productos.xlsx");
}


document.addEventListener("DOMContentLoaded", mostrarProductos);
