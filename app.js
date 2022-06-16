const fs = require('fs');
const path = require('path');
const { processData, ej2 } = require('./helpers/helper');


//Nombres de los directorios de entrada y salida
const INPUTFOLDERNAME = 'Input';
const OUTPUTFOLDERNAME = "Output";
const outputFolderPath = `./${OUTPUTFOLDERNAME}`;


(() => {
    const ej1 = processData(INPUTFOLDERNAME)
    const pathEj1 = outputFolderPath + "/ej1.json"
    const pathEj2 = outputFolderPath + "/ej2.json"
    fs.writeFileSync(pathEj1, JSON.stringify(ej1))
    const eje2 = Array.from(ej2(INPUTFOLDERNAME))
    fs.writeFileSync(pathEj2, JSON.stringify(eje2))
})()

