const pais = {
    alias: 'p',
    desc: 'País de donde desea obtener clima',
    demand: true
}

const ciudad = {
    alias: 'c',
    desc: 'Ciudad del país donde desea obtener el clima',
    demand: true
}

const argv = require('yargs').options({
    pais,
    ciudad
}) 
.help()
.argv;

module.exports = {
    argv
}