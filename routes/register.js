var db =require("./database")
var nodemailer = require("nodemailer")

module.exports=(req,res)=>{
    var email = req.body.email;
    
    var sql="select * from user where email='"+email+"'"
    db.query(sql,(err,results)=>{
        if(err)
        console.log(err)
        else{
            if(results.length>0){
                return res.redirect("/");
            }
            else{
                var transporter = nodemailer.createTransport({
                    
                    service:'gmail',
                    auth:{
                      user:'chayanbansal57@gmail.com',
                      pass:'****'
                    }
            })
            
            var key = Math.floor(Math.random()*100000000)
            var email = req.body.email
            var sql1 = "insert into user(email,passkey)values('"+email+"','"+key+"')"
            db.query(sql1,(err,results)=>{
                if(err)
                throw err
                else{
                return res.redirect("/")
            }
            })
            var mailOptions = {
                from: 'chayanbansal57@gmail.com', // sender address
                to:req.body.email, // list of receivers
                subject: 'node mailer', // Subject line
                text: `hello new admin ${key}`, // plaintext body
            }
            transporter.sendMail(mailOptions,(error,info)=>{
                if(error)
                console.log(error);
                else
                console.log("message: "+info.messageId)
            })
        }
}
})
}
