//dependencias externas
require('colors')

//dependencias internas
const { guardarInformacion, leerDB } = require('./helpers/guardarArchivo');
// const {mostrarMenu, pausa} = require('./helpers/mensajes')
const { 
    imprimirMenu, 
    pausa, 
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

//código
console.clear();

const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const tareasDB= leerDB();
    if(tareasDB)
        tareas.cargarTareasFormArray(tareasDB);
    
    do { 
        opt = await imprimirMenu();
        switch(opt) {
            case '1':
                const descripcion =  await leerInput('Descripcion: ');
                tareas.crearTarea(descripcion);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendienteCompletadas(true);
                break;
            case '4':
                tareas.listarPendienteCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas._listadoArr);
                tareas.toggleCompletadas(ids);
                console.log({ids})
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas._listadoArr);
                const confirmarBorrar = await confirmar('¿Estás Seguro?');
                if(confirmarBorrar && id != '0') {
                    tareas.borrarTarea(id);
                    console.log('Tareas borrada de manera exitosa')
                }
                break;
        }
        guardarInformacion(tareas._listadoArr);

        await pausa();
    } while(opt !== '0')
}

main();