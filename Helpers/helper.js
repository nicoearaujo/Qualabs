const path = require('path');
const fs = require('fs');
const { groupCollapsed } = require('console');



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



exports.processData = (folderName) => {
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



//  PARTE B

exports.obtenerGrupos = (folderName) => {
    let res = new Set()
    const folderPath = path.join(__dirname, '..', folderName);
    //Cargo los archivos del directorio
    const files = fs.readdirSync(folderPath)
    files.forEach(file => {
        let currentFile = fs.readFileSync(path.join(__dirname, '..', 'Input', file), 'utf8');
        let json = JSON.parse(currentFile)
        res.add(json.provider.content_module)
        res.add(json.provider.auth_module)
    })
    return res
}

exports.mejorCandidato = (folderName, grupos) => {
    const folderPath = path.join(__dirname, '..', folderName)
    let mejorCandidato = undefined
    //Cargo los archivos del directorio
    const files = fs.readdirSync(folderPath)
    const cantArchivos = files.length

    //Recorro todos los usuarios
    for (i = 0; i < cantArchivos; i++) {
        let cantCoincidencias = 0
        let currentFile = fs.readFileSync(path.join(__dirname, '..', folderName, files[i]), 'utf8');
        let json = JSON.parse(currentFile)
        //Si el provider no se utilizo aún le agrego coincidencia
        if (grupos.has(json.provider.auth_module)) {
            cantCoincidencias++
        }
        if (grupos.has(json.provider.content_module)) {
            cantCoincidencias++
        }

        //Si es el mejor candidato lo guardo
        if (!mejorCandidato || cantCoincidencias > mejorCandidato.cantCoincidencias) {
            mejorCandidato = {
                user: files[i],
                module1: json.provider.auth_module,
                module2: json.provider.content_module,
                cantCoincidencias: cantCoincidencias
            }
        }
    }

    //Elimino el modulo del grupo
    grupos.delete(mejorCandidato.module1)
    grupos.delete(mejorCandidato.module2)

    return mejorCandidato
}


exports.ej2 = (folderName) => {
    let grupos = this.obtenerGrupos(folderName)
    let res = new Set()

    while (grupos.size > 0) {
        let mejorCandidato = this.mejorCandidato(folderName, grupos)
        res.add(mejorCandidato.user)
    }
    return res
}
