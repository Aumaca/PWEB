module.exports = function(application){
    application.get('/admin/adicionar_professor', function(req,res){
        res.render('admin/adicionar_professor');
    });

application.post('/professor/salvar', function(req,res){

    async function getAdcProfessor(){
        try{
            let professor =req.body;
            let connection = application.config.dbConnection;
            const pool = await connection();

            let professorModel = application.models.professormodel;
            professorModel.salvarProfessor(professor, pool, (error, results)=>{

                if(error){
                    console.log("Erro ao inserir no banco: "+ error);
                    res.status(500).sen(error);
                }
                else{
                    console.log("professor criado!!");
                    res.redirect('/informacao/professores');
                }
            }
)}
        catch(error){
            console.log(error);
        }
    }
    getAdcProfessor();
});

}