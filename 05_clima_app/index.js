//Dependencias externas
require('dotenv').config() //esto lo q hace es manejar las las variables de entorno custom. Está descritas en el archivo que termina en .env

//Dependencias internas
const { leerInput, imprimirMenu, pausa, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async() => {

    let opt;
    const busquedad = new Busquedas();
    console.log(busquedad)

    do {
        console.clear();
        opt = await imprimirMenu();

        switch(opt) {
            case 1:
                // Mostrar mensaje
                const termino = await leerInput('Ciudad: ');
                
                // Buscar los lugares
                const lugares = await busquedad.ciudad( termino );
                
                //Seleccionar lugar
                const id = await listarLugares(lugares);
                if ( id === '0' ) continue;
                const lugarSeleccionado = lugares.find(lugar => lugar.id === id);

                // Clima
                const clima = await busquedad.climaLugar( lugarSeleccionado.lat, lugarSeleccionado.lng );
                console.log(clima)

                //Guardar el histrial
                busquedad.agregarHistorial(lugarSeleccionado.nombre);

                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Lat: ', lugarSeleccionado.lat);
                console.log('Lng: ', lugarSeleccionado.lng);
                console.log('Temperatura: ', clima.temp);
                console.log('Mínima: ', clima.min);
                console.log('Máxima: ', clima.max);
                console.log('Descripción: ', clima.desc);

                break;
            case 2:

                busquedad.historialCapitalizado.forEach((element, index) => {
                    const idx = `${ index + 1 }.`.green;
                    console.log( `${ idx } ${ element } ` );
                });
                break;
        }
        if( opt !== 0 ) await pausa();
    } while ( opt !== 0 )
}

main();