module.exports = function (app) {
  app.get('/informacao/historia', (req, res) => {
    res.render('informacao/historia');
  });
};
