const axios = require('axios');
const fs = require('fs')


class Busquedas {
    historial = [];
    dbRuta = './db/databse.json'

    constructor() {
        this.historial = this.leerDB();
    }

    //GETTERS
    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY, // process.argv: argumentos de aplicacion | process.env: variables de entorno -> va al archivo example.env y leer MAPBOX_KEY
            'limit': 5, //cantidad de lugares a buscar
            'language': 'es' //lenguje a devolver la respuesta
        }
    }

    get paramsWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get historialCapitalizado() {

        //Esta fincion es para palabras compuetas. pr ejemplo, tenemos ["a", "b", "c d"] -> va a recorrer una a una, separar las q sean compuestas, y mayusculizar la q está en la posicion 0
        return this.historial.map( lugar => {
            let palabras = lugar.split(' ');
            palabras = palabras.map( p => p[0].toUpperCase() + p.substring(1) );

            return palabras.join(' ')
        })
    }

    //METODOS
    //OBTENER Ciudades
    async ciudad( lugar = '' ) {

        try {
            // Creación de la Petición http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`, //baseURL debe llamarse así
                params: this.paramsMapbox //paraámetros a enviar
            });

            // Acá se hace la llamada real. Devuelve una promesa, por eso await
            const resp = await intance.get();


            //cuando se hace => ({}) -> indica q va a retornar un objeto de forma implicita
            return resp.data.features.map( lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));
            
        } catch (error) {
            
            return [{id: 1, nombre: 'Argentina', lng: '-17', lat: '14'}, {id: 2, nombre: 'Venezuela', lng: '-1', lat: '4'}];
        }
    }

    //Obtener clima
    async climaLugar( lat, lon ) {

        try {
            //Creacion de request
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: { ...this.paramsWeather, lat, lon } // desestructura parameterWeather, y agrega las q viene por parámetro
            })

            //request
            const resp = await instance.get();

            //desustructuracion
            const { weather, main } = resp.data;

            //construccion de la respuesta
            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log(error)
            return {
                desc: 'Soleado',
                min: -5,
                max: 20,
                temp: 1236
            }
        }
    }

    agregarHistorial(lugar = '') {
        if(this.historial.includes(lugar.toLowerCase()))
            return

        this.historial = this.historial.splice(0,5);
        this.historial.unshift(lugar.toLowerCase());
        this.guardarDB();
        
    }

    guardarDB() {   
        const payload = {historial: this.historial};
        fs.writeFileSync(this.dbRuta, JSON.stringify(payload));
    }

    leerDB() {
        if(!fs.existsSync('./db/databse.json')) 
            return;

        const info = fs.readFileSync(this.dbRuta, {encoding: 'utf-8'});//leo la info
        const data = JSON.parse( info );//la convierto a mi objeto del string q la lee

        return data.historial;
    }
}

module.exports = Busquedas;