// generateDITA.js
const fs = require('fs');
const path = require('path');

function createTopic(id, folder, filename, title, content) {
  const topicXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE concept PUBLIC "-//OASIS//DTD DITA Concept//EN" "concept.dtd">
<concept id="${filename}">
  <title>${title}</title>
  <conbody>
    ${content}
  </conbody>
</concept>`;

  const filePath = path.join(folder, `${filename}.dita`);
  fs.writeFileSync(filePath, topicXML);
}

function createDITAMap(id, outputFolder, pruebas, medicamentos) {
  const ditamap = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE map PUBLIC "-//OASIS//DTD DITA Map//EN" "map.dtd">
<map>
  <title>Informe Médico</title>

  <topicref navtitle="Información de la consulta">
    <topicref href="medico.dita" navtitle="Médico"/>
    <topicref href="infoConsulta${id}.dita" navtitle="Resumen de la consulta"/>
  </topicref>

  <topicref navtitle="Pruebas Realizadas">
    ${pruebas.map(p => `<topicref href="${p}" navtitle="${path.basename(p, '.dita')}"/>`).join('\n    ')}
  </topicref>

  <topicref navtitle="Diagnóstico">
    <topicref href="resultados${id}.dita" navtitle="Resultados"/>
    <topicref href="enfermedades/otitis.dita" navtitle="Enfermedad"/>
  </topicref>

  <topicref navtitle="Tratamiento">
    <topicref navtitle="Medicación">
      ${medicamentos.map(m => `<topicref href="${m}" navtitle="${path.basename(m, '.dita')}"/>`).join('\n      ')}
    </topicref>
    <topicref navtitle="Recomendaciones">
      <topicref href="recomendaciones/recOtitis.dita" navtitle="Recomendaciones"/>
    </topicref>
  </topicref>
</map>`;

  const filePath = path.join(outputFolder, `informe${id}.ditamap`);
  fs.writeFileSync(filePath, ditamap);
}

module.exports = { createTopic, createDITAMap };
