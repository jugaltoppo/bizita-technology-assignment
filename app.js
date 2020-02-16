var express = require('express');
var app= express();
var request= require('request');
var mongoose= require('mongoose');
var Data = require("./models/dataModel");
var methodOverride = require("method-override");

app.set("view engine","ejs")
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(express.static("public"));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
var uri = process.env.MONGOOSE || "mongodb://localhost/bizita";
mongoose.connect(uri);

request("http://hradmin.aryupay.io/tracking/viewreport.php", function(err, response, body){
if(!err && response.statusCode===200){
    var api = JSON.parse(body);
    // console.log( api.Success);
    Data.insertMany(api.Success, function(err, data){
        if(err){
            console.log(err);
        }else{
            console.log(data)
        }
    });
}else{
    console.log(err);
}
})

app.get("/fetch", function(req, res){
    request("http://hradmin.aryupay.io/tracking/viewreport.php", function(err, response, body){
    if(!err && response.statusCode===200){
        var api = JSON.parse(body);
        // console.log( api.Success);
        Data.insertMany(api.Success, function(err, data){
            if(err){
                console.log(err);
            }else{
                res.redirect("home");
            }
        });
    }else{
        console.log(err);
    }
    })
})

app.get("/", function(req, res){
    res.redirect("/home");
})

app.get("/home", function(req, res){
    Data.find({},function(err, data){
        if(err){
            console.log(err);
        }else{
            res.render("home", {data: data});
        }
    })  
})

app.get("/home/:id/edit", function(req, res){
    Data.findById(req.params.id, function(err, foundData){
        if(err){
            console.log(err);
        }else{
            res.render("edit",{foundData: foundData});
        }
    })
})

app.put("/home/:id", function(req, res){
    Data.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedData){
        if(err){
            console.log("error");
        }else{
            res.redirect("/home");
        }
    })
})

app.delete("/home/deleteall", function(req, res){
    Data.deleteMany({}, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/home");
        }
    })
})

app.delete("/home/:id", function(req, res){
    Data.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        }else{
            res.redirect("/home");
        }
    });
})




var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("listening to port " + port);
})