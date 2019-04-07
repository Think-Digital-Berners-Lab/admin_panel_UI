var db = require("./database")
module.exports = (req,res)=>{
    
    var event_name = req.body.event_name
    var event_sd = req.body.event_sd
    var event_ed = req.body.event_ed
    var event_link = req.body.event_link
    
  
    if(req.files.pimg7!=""){
        var file = req.files.event_pic;
        var event_pic = file.name;
        if (
          file.mimetype == "image/jpeg" ||
          file.mimetype == "image/png" ||
          file.mimetype == "image/jpg"
        ) {
          var uploadpath = "public/images/" + event_pic;
          var sql = "insert into events (event_name,event_sd,event_ed,event_link,event_pic)  values  ('"+event_name+"','"+event_sd+"','"+event_ed+"','"+event_link+"','"+event_pic+"') "
        db.query(sql, (err, results, fields) => {
          if (err) console.log("error occured", err);
          else {
            return res.redirect("/events");
          }
        });
        file.mv(uploadpath, err => {
          if (err) throw err;
          else console.log("file uploaded");
        });
      } else res.send("Wrong file format");
        }
      
}