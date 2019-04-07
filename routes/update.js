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
    
    var mathPName = "SELECT * from add_new_project WHERE project_name = '"+project_name+"'"
    db.query(mathPName,(err,results)=>{
        if(err)
        throw err
        else {
            if(results.length>0){    
                   
                
                    var sql = "update add_new_project set project_description='"+project_description+"',member1='"+member1+"',member2='"+member2+"',member3='"+member3+"',member4='"+member4+"',member5='"+member5+"',member6='"+member6+"' where project_name='"+project_name+"' "
                    db.query(sql,(err,result)=>{
                        if(err)
                        console.log(err)
                        else
                        return res.redirect('/project')
                        
                    })
            }
            else{
                res.send({
                    status:"Invalid Project Name"
                })
            }
        }
    })
  

    

      
}