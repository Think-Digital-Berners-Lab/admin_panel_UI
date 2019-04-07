var express = require("express")
var morgan = require("morgan")
var bodyParser = require("body-parser")
var fileUpload = require("express-fileupload")
var path = require("path")
var ejs = require("ejs")
var session = require("express-session")
var db = require("./routes/database")

var app = express();

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + '/public'));

app.set('view engine','ejs');
app.use(fileUpload())
app.use(session({secret:"wesdfgtrftt564324", saveUninitialized:true, resave:true}))


//session auth

var auth = function(req,res,next){
    if(req.session.loggedIn){
        next();
       
    }
    
    else{
        next();
    }
}


//dashboard
app.get('/dashboard',auth,(req,res)=>{
    res.sendFile(__dirname+"/dashboard.html")
})

//project
app.get('/project',auth,(req,res)=>{
    db.query("select * from add_new_project",(err,results)=>{
        res.render('project',{
            project:results
        })
    })
        
})


//add_new_project
var add_new_project = require("./routes/add_new_project")
app.route("/add_new_project").post(add_new_project)
app.get('/add_new_project',auth,(req,res)=>{
    res.sendFile(__dirname+"/add_new_project.html")
})

//add_new_event
var add_new_event = require("./routes/add_new_event")
app.route("/add_new_event").post(add_new_event)
app.get("/add_new_event",auth,(req,res)=>{
    res.sendFile(__dirname+"/add_new_event.html")
})

//events
app.get('/events',auth,(req,res)=>{
    db.query("select * from events",(err,results)=>{
        res.render('events',{
            event:results
        })
    })
})



//add_new_sponsers
var add_new_sponsers = require("./routes/add_new_sponsers")
app.route("/add_new_sponsers").post(add_new_sponsers)
app.get('/add_new_sponser',auth,(req,res)=>{
    res.sendFile(__dirname+"/add_new_sponser.html")
})

//sponser
app.get('/sponsers',auth,(req,res)=>{
    db.query("select * from sponsers",(err,results)=>{
        res.render('sponser',{
            sponser:results
        })
    })
        
})

//update_project
app.get("/update_project/:id",auth,(req,res)=>{
    db.query("select * from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.render('update_project',{
            update_project:results
        })
    })
})


//upload_image1
var upload_image1 = require("./routes/upload_image1")
app.get("/upload_image1/:id",auth,(req,res)=>{
    db.query("select * from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.render('upload_image1',{
            upload_image:results
        })
    })
})
app.route("/upload_image1").post(upload_image1)

//upload_image2
var upload_image2 = require("./routes/upload_image2")
app.get("/upload_image2/:id",auth,(req,res)=>{
    db.query("select * from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.render('upload_image2',{
            upload_image:results
        })
    })
})
app.route("/upload_image2").post(upload_image2)

//upload_image3
var upload_image3 = require("./routes/upload_image3")
app.get("/upload_image3/:id",auth,(req,res)=>{
    db.query("select * from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.render('upload_image3',{
            upload_image:results
        })
    })
})
app.route("/upload_image3").post(upload_image3)

//upload_image4
var upload_image4 = require("./routes/upload_image4")
app.get("/upload_image4/:id",auth,(req,res)=>{
    db.query("select * from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.render('upload_image4',{
            upload_image:results
        })
    })
})
app.route("/upload_image4").post(upload_image4)

//upload_image5
var upload_image5 = require("./routes/upload_image5")
app.get("/upload_image5/:id",auth,(req,res)=>{
    db.query("select * from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.render('upload_image5',{
            upload_image:results
        })
    })
})
app.route("/upload_image5").post(upload_image5)

//upload_image6
var upload_image6 = require("./routes/upload_image6")
app.get("/upload_image6/:id",auth,(req,res)=>{
    db.query("select * from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.render('upload_image6',{
            upload_image:results
        })
    })
})
app.route("/upload_image6").post(upload_image6)

//upload_image2
var upload_image7 = require("./routes/upload_image7")
app.get("/upload_image7/:id",auth,(req,res)=>{
    db.query("select * from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.render('upload_image7',{
            upload_image:results
        })
    })
})
app.route("/upload_image7").post(upload_image7)

//update
var update = require("./routes/update")
app.route("/update").post(update)

//delete
app.get('/delete/:id',auth,(req,res)=>{
    db.query("delete from add_new_project where project_name = '"+req.params.id+"'",(err,results)=>{
        res.redirect("http://localhost:3000/project")
    }) 
})



//login
var login = require("./routes/login")
app.route("/login").post(login)
app.get('/',(req,res)=>{
  res.sendfile(__dirname+"/login.html")
  })

  //register
  var register = require("./routes/register")
  app.route("/register").post(register)
  app.get('/register',(req,res)=>{
    res.sendFile(__dirname+"/register.html");
  })

  //logout
app.get('/logout',function(req,res){
    //req.logout();
    req.session.loggedIn=false;
    res.redirect('/');
});



app.listen(3000,(err)=>{
    if(err)
    console.log(err)
    else
    console.log("Server Connected at port 3000...")
})