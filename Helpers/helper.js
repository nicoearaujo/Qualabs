const path = require('path');
const fs = require('fs');


const cargarOutput = (files, res) => {
    files.forEach(file => {
        let currentFile = fs.readFileSync(path.join(__dirname, '..', 'Input', file), 'utf8');
        let json = JSON.parse(currentFile)

        //Si no se cargo el auth_module en particular se crea empty array
        if (!res.auth_module[json.provider.auth_module]) {
            res.auth_module[json.provider.auth_module] = []
        }
        //Si no se cargo el content_module en particular se crea empty array
        if (!res.content_module[json.provider.content_module]) {
            res.content_module[json.provider.content_module] = []
        }

        //Inserciones de users
        res.content_module[json.provider.content_module].push(`./${file}`)
        res.auth_module[json.provider.auth_module].push(`./${file}`)
    })
}



exports.processData = function (folderName) {
    let res = {
        auth_module: {},
        content_module: {}
    };

    const folderPath = path.join(__dirname, '..', folderName);
    //Cargo los archivos del directorio
    const files = fs.readdirSync(folderPath)
    cargarOutput(files, res)
    return res
}
