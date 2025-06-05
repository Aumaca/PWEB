
module.exports = function(app){
    app.get("/informacao/professores", function(req,res){
        const sql = require('mssql');
        const sqlConfig = {
            user:'BD2313027',
            password: 'K1912jr@',
            database: 'BD',
            server: 'APOLO',
            options:{
                encrypt: false,
                trustServerCertificate:true,
            }
        }


        async function getProfessores() {
            try{
                const deadpool = await sql.connect(sqlConfig);
                const results = await deadpool.request().query('SELECT * FROM PROFESSORES')

                //res.json(results.recordset);

                res.render('informacao/professores', {profs: results.recordset})
            }
            catch(err){
                console.log(err)
            }
        }
        getProfessores();

    });
}


