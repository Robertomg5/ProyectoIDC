const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

function generatePDF(idConsulta) {
  return new Promise((resolve, reject) => {
    // Ruta al DITAMap generado en la raíz de ProyectoIDC
    const ditamap = path.resolve(__dirname, `../informe${idConsulta}.ditamap`);

    // Ruta donde está instalado DITA-OT (fuera de ProyectoIDC)
    const ditaPath = path.resolve("C:/Users/rober/OneDrive/Documentos/IDC/dita-ot-4.3.1/bin/dita.bat");

    // Ruta de salida dentro de ProyectoIDC/output
    const outputDir = path.resolve(__dirname, `../informes/informe-${idConsulta}`);

    // Asegurar que la carpeta de salida existe
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Comando para ejecutar DITA-OT
    const command = `"${ditaPath}" -i "${ditamap}" -f pdf -o "${outputDir}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Error ejecutando DITA-OT:", error);
        console.error(stderr);
        reject(error);
        return;
      }
      console.log("DITA-OT ejecutado con éxito:", stdout);
      resolve(outputDir);
    });
  });
}

module.exports = generatePDF;
