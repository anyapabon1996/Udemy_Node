//Paquetes
const {crearArchivo} = require('./helpers/multiplicar')
const argv = require('./config/yargs')
const colors = require('colors')

//Ejecuciones
console.clear()
// console.log(process.argv)

// const [ , , arg3 = 'base=5'] = process.argv //1er argumento: direccion de node- 2do argumento: direccion del archivo este (app.js). 3cer argumento: los q le mande por consola
// const [ , baseDeconsola] = arg3.split('=') 
// console.log(arg3)
// console.log(baseDeconsola)

crearArchivo(argv.l, argv.b, argv.h)
    .then(msg => console.log(msg.rainbow))
    .catch(err => console.log(err));