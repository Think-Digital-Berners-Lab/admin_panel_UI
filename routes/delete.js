var db = require("./database")
module.exports = (req,res)=>{
    var project_name = req.params.id
    var sql = "delete from add_new_project where project_name ='"+project_name+"'"
    db.query(sql,(err,results)=>{
        if(err)
        throw err
        else
        return res.redirect('/project')
    })
}