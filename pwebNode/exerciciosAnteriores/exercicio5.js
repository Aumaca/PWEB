let eventos = require('events');

//let EmissorEventos = eventos.EventEmitter;

//let ee = new EmissorEventos();

let ee = new eventos.EventEmitter();

ee.on('dados', function (fecha) {
  console.log(fecha);
});
ee.emit('dados', 'primeira vez' + Date.now());

setInterval(() => {
  ee.emit('dados', Date.now());
}, 500);
