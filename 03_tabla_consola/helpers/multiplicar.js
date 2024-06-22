//Paquetes
const colors = require('colors')
const fs = require('node:fs');

// const tableBase = [1,2,3,4,5,6,7,8,9,10]
// const createFile = (base) => {
//     return new Promise((resolve) => {
//         let salida = '';
//         for(let i = 0; i<tableBase.length; i++){
//             salida += `${base}X${i+1}=${base*(i+1)}\n`
//         }
//         fs.writeFileSync(`Tabla-${base}.txt`, salida);
//         resolve(`Tabla-${base}.txt creada`);
//     )};
// }

const multiplicar = (base = 5, hasta) => {
    return new Promise((resolve) => {
        let salida, consola;
        for(let i = 1; i<=hasta; i++){
            salida += `${base} X ${i} = ${base*(i)}\n`;
            consola += `${base} ${'X'.green} ${i} ${'='.green} ${base*(i)}\n`;
        }
        resolve(`${salida} + ${consola}`)
    });
}

const crearArchivo = async(listar, base = 5, hasta = 10) => {

    try {
        const tablaCreada = await multiplicar(base, hasta);
        const [paraGuardar, paraMostrar] = tablaCreada.split('+')
        if(listar){
            console.log('============================'.green);
            console.log(`        Tabla del ${colors.blue(base)}`.green);
            console.log('============================'.green);
            console.log(paraMostrar)
        }
        fs.writeFileSync(`./salida/Tabla-${base}.txt`, paraGuardar);
        return `Tabla-${base}.txt`;
    } catch (err) {
        throw err;
    }
}

//esto crea de manera directa el archico, solo que en la raiz del programa
// fs.writeFile(`Tabla-${base}.txt`, salida, (err) => {
//     if(err) 
//         throw err
//     console.log(`Tabla-${base}.txt creada`)
// })

//si este tiene error, hay q envolverlo en un try catch


//Exportar
module.exports = {
    crearArchivo
}