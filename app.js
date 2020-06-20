const { argv } = require('./config/yargs');
const countryService = require('./country/countryService');



const country = argv.pais;
const city = argv.ciudad;

countryService.getWeather(country,city)
    .then( (weather) => {
        console.log(weather);
    })
    .catch((error) => {
        console.log(error);
    })