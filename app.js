const fs = require('fs');
const path = require('path');


const { processData } = require('./helpers/helper');

const INPUTFOLDERNAME = 'Input';
const OUTPUTFOLDERNAME = "Output";

const outputFolderPath = `./${OUTPUTFOLDERNAME}`;


(() => {
    const ej1 = processData(INPUTFOLDERNAME)
    const pathEj1 = outputFolderPath + "/ej1.json"
    fs.writeFileSync(pathEj1, JSON.stringify(ej1))
})()

