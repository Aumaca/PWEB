module.exports = function (app) {
  app.get('/admin/crud_professores', function (req, res) {
    async function getProf() {
      try {
        let professoresModel = app.models.professormodel();
        professoresModel.getProfessores(sql, config, function (err, results) {
          if (err) {
            console.error("Erro ao buscar professores:", err);
            return res.status(500).send('Erro ao consultar dados: ' + err.message);
          }

          res.render('admin/crud_professores', { profs: results });
        });
      } catch (err) {
        console.error(err);
        res.status(500).send('Erro ao conectar ao banco de dados: ' + err.message);
      }
    }

    getProf();
  });
};
