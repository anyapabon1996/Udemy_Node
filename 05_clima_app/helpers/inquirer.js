const inquirer = require('inquirer')
require('colors');

//Esto es lo que saldrá en el menú
const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2.'.green} Historial`
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`
            }
        ]
    }
];

const listarLugares = async( lugares = [] ) => {

    const choices = lugares.map((lugar, index) => {
        const idx = `${index+1}`.green;
        return {
            value: lugar.id,
            name: `${idx}. ${lugar.nombre}`
        }
    });

    // choices.push({value: '0', name: '0.'.green + ' Cancelar'}); //funciona ok. lo coloca al final
    choices.unshift({value: '0', name: '0.'.green + ' Cancelar'});//Funciona ok. lo coloca al inicio

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]

    const {id} = await inquirer.prompt(preguntas); //esto lo q hace es tomar lo q está en la linea 55
    return id;
}

const mostrarListadoCheckList = async(tareas = []) => {

    const choices = tareas.map((tarea, index) => {
        const idx = `${index+1}`.green;
        return {
            value: tarea.id,
            name: `${idx}. ${tarea.desc}`,
            checked: tarea.completadoEn ?  true : false //true: al abrir sale marcada. Si es false, sale desmarcada
        }
    });

    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const {ids} = await inquirer.prompt(preguntas); //esto lo q hace es tomar lo q está en la linea 55
    return ids;
}

const pausa = async() => {

    const questions = [
        {
            type: 'input',
            name: 'seleccion',
            message: `Presiones ${'ENTER'.green} para continuar: `
        }
    ];
    console.log('\n');
    return await inquirer.prompt(questions);
};

const imprimirMenu = async() => { 
    console.clear();
    console.log('====================================='.green);
    console.log('      Seleccione una opción'.white);
    console.log('=====================================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas); //esto lo q hace es tomar lo q está en la linea 9
    return opcion;
}

const leerInput = async(message) => {
    const question = [ 
        {
            type: 'input',
            name: 'desc',
            message, //como se llama el mismo q va por parametro, toma ese valor
            validate(value) {
                if(value.length === 0)
                    return 'Por favor ingrese un valor';
                return true;
            }
        }
    ]

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}


module.exports = {
    imprimirMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoCheckList
}
