
# 📦 Distribuidora Argentina - Listado de Productos

Este proyecto permite visualizar, filtrar, paginar, importar y exportar productos de una distribuidora utilizando **HTML, CSS y JavaScript nativo**.

---

## 🧰 Funcionalidades

- ✅ Listado de productos con paginación
- 🔍 Búsqueda en vivo (por nombre, categoría, precio o stock)
- 📤 Exportación a PDF personalizada (con fecha y logo)
- 📥 Exportación a Excel por listado general o por categoría
- 📂 Importación de productos desde archivos Excel (`.xlsx`)
- 🎨 Estilo visual con colores **azules, celestes y blanco**

---

## 📁 Estructura del proyecto
/ (raíz)
├── index.html
├── style.css
├── script.js


---

## 📥 Instrucciones de uso

Cloná el repositorio:
```bash
git clone https://github.com/tu-usuario/nombre-del-repo.git
Abrí index.html en tu navegador.

Usá el botón para cargar un archivo .xlsx con los siguientes campos:

Producto	Precio	Stock	Categoría
Yerba	900	25	Bebidas

Exportá el listado con los botones correspondientes.

📦 Librerías utilizadas
SheetJS (XLSX) – para lectura y exportación de Excel

jsPDF + AutoTable – para generación de PDF


