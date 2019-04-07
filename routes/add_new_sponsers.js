var db = require("./database")
module.exports = (req,res)=>{
    var sponser_name = req.body.sponser_name;
    
    if(req.files.sponser_logo!=""){
        var file = req.files.sponser_logo;
        var logo = file.name;
        if (
          file.mimetype == "image/jpeg" ||
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg"
        ) {
          var uploadpath = "public/images/" + logo;
          var sqldata =
          "insert into sponsers (name,logo)values('"+sponser_name +"','"+logo+"')"
        db.query(sqldata, (err, results, fields) => {
          if (err) console.log("error occured", err);
          else {
            return res.redirect("/sponsers");
          }
        });
        file.mv(uploadpath, err => {
          if (err) throw err;
          else console.log("file uploaded");
        });
      } else res.send("Wrong file format");
        }
        }