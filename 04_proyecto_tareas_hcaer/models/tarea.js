const { v4: uuidv4 } = require('uuid');

class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    constructor(id = '', desc, completadoEn = null) {
        this.id = id === '' ? uuidv4() : id;
        this.desc = desc;
        this.completadoEn = completadoEn;
    }
}

//Cuando se exporta de manera directa, no es necesario importarlo
module.exports = Tarea;