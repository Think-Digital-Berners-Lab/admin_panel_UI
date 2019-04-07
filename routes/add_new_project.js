var db = require("./database")
module.exports = (req,res)=>{
    var project_name = req.body.project_name;
    

    var project_description=req.body.project_description
    //members
    var member1 = req.body.member1
    var member2 = req.body.member2
    var member3 = req.body.member3
    var member4 = req.body.member4
    var member5 = req.body.member5
    var member6 = req.body.member6
    
  
    
    

    var sql = "insert into add_new_project (project_name,project_description,member1,member2,member3,member4,member5,member6)  values  ('"+project_name+"','"+project_description+"','"+member1+"','"+member2+"','"+member3+"','"+member4+"','"+member5+"','"+member6+"') "
    db.query(sql,(err,result)=>{
        if(err)
        console.log(err)
        else
        return res.redirect('/project')
        
    })
      
}