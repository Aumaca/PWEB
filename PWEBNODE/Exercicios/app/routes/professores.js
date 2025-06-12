let dbConnection = require('../config/dbConnection');
module.exports = function(app){
    app.get("/informacao/professores", function(req,res){
            async function getProfessores() {
            try{
                let connection = app.config.dbConnection;
                const deadpool = await connection();
                let professoresModel = app.models.professormodel;
                professoresModel.getProfessores(deadpool, function(error,results){
                    res.render('informacao/professores', {profs: results.recordset})
                })

               

                //res.json(results.recordset);

                
            }
            catch(err){
                console.log(err)
            }
        }
        getProfessores();

    });
}


