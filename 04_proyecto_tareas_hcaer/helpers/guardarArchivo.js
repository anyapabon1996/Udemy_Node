const fs = require('fs')

const ruta = './db/data.json';

const guardarInformacion = (data) => {
    fs.writeFileSync(ruta, JSON.stringify(data));
}

const leerDB = () => {
    if(!fs.existsSync(ruta))
        return null;
    
    const info = fs.readFileSync(ruta, {encoding: 'utf-8'}); //devuelve un string
    return JSON.parse(info); //lo convierte al objeto q es
}


module.exports = {
    guardarInformacion,
    leerDB
}