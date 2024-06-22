const Tarea = require("./tarea");

/**
 * _listado: {
 *  'uuid-12312-45456-5: {id:12, desc: 'asd', completadoEn: algunaFecha},{...}}
 */
class Tareas {
    _listado = {};

    constructor() {
        this._listado = {};
    }

    get _listadoArr() {
        const listado = [];
        Object.keys(this._listado).forEach(key => {
            const tarea = this._listado[key];
            listado.push(tarea);
        })
        return listado;
    }

    crearTarea(desc = '') {
        const tarea = new Tarea('', desc, null);
        this._listado[tarea.id] = tarea;
    }

    cargarTareasFormArray = (tareas = []) => {
        tareas.forEach(element => {
            const tarea = new Tarea(element.id, element.desc, element.completadoEn);
            this._listado[tarea.id] = tarea;
        });
    }

    listadoCompleto = () => {
        this._listadoArr.forEach((element, index) => {
            const miIndice = `${index+1}.`.green;
            const {desc, completadoEn} = element;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;

            console.log(`${miIndice} ${desc} :: ${estado}`);
        });
    }

    listarPendienteCompletadas = (completadas = true) =>  {
        let contador = 0
        this._listadoArr.forEach((element) => {
            
            const {desc, completadoEn} = element;
            const estado = (completadoEn) ? 'Completada'.green : 'Pendiente'.red;
            if(completadas && completadoEn){
                contador++;
                const miIndice = `${contador}.`.green;
                console.log(`${miIndice} ${desc} :: ${completadoEn.green}`);
            }
            else if (!completadas && !completadoEn) {
                contador++;
                const miIndice = `${contador}.`.green;
                console.log(`${miIndice} ${desc} :: ${estado}`);
            }
            
        });
    }

    borrarTarea = (id = '') => {
        if(this._listado[id])
            delete this._listado[id]
    }

    toggleCompletadas = (ids=[]) => {
        ids.forEach(element => {
            const tarea = this._listado[element];
            if(!tarea.completadoEn)
                tarea.completadoEn = new Date().toISOString();
        });

        this._listadoArr.forEach(element => {
            if( !ids.includes(element.id) ) {
                this._listado[element.id].completadoEn = null;
            }
        })

    }
}
module.exports = Tareas;