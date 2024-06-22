//Argumentos de aplicacion
const yargs = require('yargs');
const { option } = require('yargs');
const argv = require('yargs')
                .options(
                    {'b': {
                        alias: 'base',
                        type: 'number',
                        demandOption: true,
                        describe: 'Es la base de la tabla'
                    },
                    'l': {
                        alias: 'listar',
                        type: 'boolean',
                        default: false,
                        describe: 'Muestra la tabla en consola'
                    },
                    'h': {
                        alias: 'hasta',
                        type: 'number',
                        default: 10,
                        describe: 'Indica el valor hasta donde se hará la multiplicación'
                    }
                })
                .check( (otro, option) => {
                   if(isNaN(otro.b)){
                       throw 'La base debe ser un numero'
                   }
                   return true
                })
                .argv;


module.exports = argv