const axios = require('axios');
const colors = require('colors');
const apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'appid=df190f009ed6350d99be877cd4f4c0f8';

let countries = [];

const loadCountries = () =>{
    try{
        countries = require('./countries.json');
    } catch(error){
        countries = [];
    }
}

const getCountryCode = (countryName) =>{
    loadCountries();
    let code = countries.filter(country =>{
        return country.Name.toLowerCase() === countryName.toLowerCase();
    })[0].Code;
    return code;
}

const getWeather = async (country,city) => {
    const encodeCountry = await getCountryCode(country);
    if(encodeCountry === undefined){
        return `Error al encontrar el clima de la ciudad ${city} del país ${country}`;
    }
    const encodeCity = encodeURI(city);
    
    const instance = axios.create({
        baseURL: `${apiUrl}?q=${encodeCity},${encodeCountry}&${apiKey}`,
        //timeout: 1000,
        //headers: {'X-Custom-Header': 'foobar'}
    });
    try {
        const resp = await instance.get();
        const weather = resp.data.weather[0];
        const especificData = resp.data.main;
        const time = weather.main;
        const description = weather.description;
        const temp = especificData.temp.toString();
        const humidity = especificData.humidity.toString();
        return `El clima de ${city} del país ${country} es: ${time.green}\nLa descripción del clima es: ${description.green}\nLa temperatura es: ${temp.green}${'°C'.green}\nLa humedad es: ${humidity.green}${'%'.green}`
     } catch (error) {
         return `Error al encontrar el clima de la ciudad ${city} del país ${country}`;
     }
}


module.exports = {
    getWeather
}