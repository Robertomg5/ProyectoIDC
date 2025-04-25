// generateDITA.js
const fs = require('fs');
const path = require('path');

function createTopic(folder, filename, title, content) {
  const topicXML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE concept PUBLIC "-//OASIS//DTD DITA Concept//EN" "http://docs.oasis-open.org/dita/v1.3/os/dtd/concept.dtd">
<concept id="${filename}" xmlns:ditaarch="http://dita.oasis-open.org/architecture/2005/">
  <title>${title}</title>
  <conbody>
    ${content}
  </conbody>
</concept>`;

  const filePath = path.join(folder, 'consultas', `${filename}.dita`);
  fs.writeFileSync(filePath, topicXML);
}

function createDITAMap(id, folder, medico, pruebas, enfermedad, medicamentos, recomendacion) {
  const ditamap = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE map PUBLIC "-//OASIS//DTD DITA Map//EN" "map.dtd">
<map>
  <title>Informe Médico</title>

  <topicref navtitle="Información de la consulta">
    <topicref href="../medicos/${medico}.dita" navtitle="Médico"/>
    <topicref href="../consultas/infoConsulta${id}.dita" navtitle="Resumen de la consulta"/>
  </topicref>

  <topicref navtitle="Pruebas Realizadas">
    ${pruebas.map(p => `<topicref href="../${p}" navtitle="${path.basename(p, '.dita')}"/>`).join('\n    ')}
  </topicref>

  <topicref navtitle="Diagnóstico">
    <topicref href="../consultas/resultados${id}.dita" navtitle="Resultados"/>
    <topicref href="../enfermedades/${enfermedad}.dita" navtitle="Enfermedad"/>
  </topicref>

  <topicref navtitle="Tratamiento">
    <topicref navtitle="Medicación">
      ${medicamentos.map(m => `<topicref href="../${m}" navtitle="${path.basename(m, '.dita')}"/>`).join('\n      ')}
    </topicref>
    <topicref navtitle="Recomendaciones">
      <topicref href="../recomendaciones/${recomendacion}.dita" navtitle="Recomendaciones"/>
    </topicref>
  </topicref>
</map>`;

  const filePath = path.join(folder, 'ditamaps', `${id}.ditamap`);
  fs.writeFileSync(filePath, ditamap);
}

module.exports = { createTopic, createDITAMap };
