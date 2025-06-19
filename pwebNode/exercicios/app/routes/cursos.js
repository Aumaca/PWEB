module.exports = function (app) {
  app.get('/informacao/cursos', (req, res) => {
    res.render('informacao/cursos');
  });
};
