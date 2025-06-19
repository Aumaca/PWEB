let app = require('./app/config/server'); //carregando o módulo do servidor

//npm start app.js
/* let rotaHome = require('./app/routes/home');
rotaHome(app);

let rotaAdicionarUsuario = require('./app/routes/adicionar_usuario');
rotaAdicionarUsuario(app);

let rotaHistoria = require('./app/routes/historia');
rotaHistoria(app);

let rotaCursos = require('./app/routes/cursos');
rotaCursos(app);

let rotaProfessores = require('./app/routes/professores');
rotaProfessores(app);
 */
app.listen(3000, function () {
  console.log('servidor com express carregado');
  //console.log(testeModu);
});
