
module.exports = function(app){
app.get("/admin/adicionar_user", function(req,res){
    res.render("admin/adicionar_user")
})
}