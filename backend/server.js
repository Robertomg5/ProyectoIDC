const express = require('express');
const fs = require('fs');
const path = require('path');
const { createTopic, createDITAMap } = require('./generateDITA');
const generatePDF = require('./generatePDF');
const { stringify } = require('querystring');

const app = express();
app.use(express.json());
// servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname, "../")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../html/informe.html"));
});

app.post('/crear-informe', (req, res) => {
  const data = req.body;
  const enfermedad = data.enfermedad;
  const recomendacion = data.recomendacion;
  const medico = data.medico;
  const nombre = data.nombre.trim().replace(/\s+/g, "");
  const apellidos = data.apellidos.trim().replace(/\s+/g, "");
  const id = `${nombre}_${apellidos}`;

  const folder = path.join(__dirname, '../'); // la raíz del proyecto

  fs.mkdirSync(folder, { recursive: true });

  // Crear infoConsulta.dita
  const infoContent = `
    <p><b>Nombre:</b> ${data.nombre}</p>
    <p><b>Apellidos:</b> ${data.apellidos}</p>
    <p><b>Edad:</b> ${data.edad}</p>
    <p><b>Síntomas:</b> ${data.sintomas}</p>
  `;
  createTopic(folder, `infoConsulta${id}`, 'Resumen de la consulta', infoContent);

  // Crear resultados.dita
  const obsContent = `<p>${data.resultados}</p>`;
  createTopic(folder, `resultados${id}`, 'Resultados de las pruebas', obsContent);

  // Preparar rutas relativas de pruebas y medicamentos
  const pruebas = data.pruebas.map(p => `pruebas/${p}.dita`);
  const medicamentos = data.medicamentos.map(m => `medicamentos/${m}.dita`);

  // Crear el ditamap
  createDITAMap(id, folder, medico, pruebas, enfermedad, medicamentos, recomendacion);

  // Generar el PDF
  generatePDF(id, (err, pdfPath) => {
    if (err) return res.status(500).send('Error generando PDF');

    res.json({ success: true });
  });

  res.json({ success: true });
});

app.get("/descargar/:id", (req, res) => {
    const id = req.params.id;
  
    generarPdf(id, (err, rutaPdf) => {
      if (err) return res.status(500).send("Error al generar el PDF");
  
      res.download(rutaPdf, `informe-${id}.pdf`);
    });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
