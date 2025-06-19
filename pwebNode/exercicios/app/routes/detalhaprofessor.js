module.exports = function (app) {
  app.get('/informacao/professores/detalhaprofessor', function (req, res) {
    async function getProfessoresID() {
      try {
        const pool = app.config.dbConnection();

        let professoresModel = app.models.professormodel();
        professoresModel.getProfessor(pool, function (err, results) {
          res.render('informacao/professores/detalhaprofessor', {
            profs: results.rows,
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    getProfessoresID();
  });
};
