var db  = require("./database")

module.exports=(req,res)=>{
    var email = req.body.email;
    var key = req.body.key;
    var sql = "select email,passkey from user where email='"+email+"'"
    db.query(sql,(err,results)=>{
        if(err)
        throw err
        else{
            if(results.length>0){
                if(results[0].passkey===key){
                    req.session.loggedIn = true;
                req.session.email = email;
                   return res.redirect("/dashboard")
                }
                else
                return res.redirect("/")
            }
        }

    })
}