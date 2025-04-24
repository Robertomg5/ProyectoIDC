const { exec } = require("child_process");
const path = require("path");

function generarPdf(idConsulta, callback) {
  const ditaBat = `"C:\\Users\\rober\\OneDrive\\Documentos\\IDC\\dita-ot-4.3.1\\bin\\dita.bat"`;
  const ditamap = `"C:\\Users\\rober\\OneDrive\\Documentos\\IDC\\ProyectoIDC\\dita\\informe${idConsulta}.ditamap"`;
  const salida = `"C:\\Users\\rober\\OneDrive\\Documentos\\IDC\\ProyectoIDC\\output\\informe-${idConsulta}"`;

  const comando = `${ditaBat} -i ${ditamap} -f pdf -o ${salida}`;

  exec(comando, (error, stdout, stderr) => {
    if (error) {
      console.error("❌ Error generando PDF:", stderr);
      return callback(error);
    }
    console.log("✅ PDF generado correctamente.");
    callback(null, path.join(salida, "informe.pdf"));
  });
}

module.exports = generarPdf;
