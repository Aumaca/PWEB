module.exports = function (app) {
  app.get('/admin/adicionar_usuario', (req, res) => {
    res.render('admin/adicionar_usuario');
  });
};
