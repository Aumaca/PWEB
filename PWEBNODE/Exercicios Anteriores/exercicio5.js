let eventos = require("events")


let emitordeeventos = eventos.EventEmitter
let ee = new emitordeeventos()


ee.on('dado', function(fecha){
    console.log(fecha)
});

ee.emit('dado','primeira vez'+Date.now())

setInterval(function(){
    ee.emit('dado', Date.now());
}, 500);