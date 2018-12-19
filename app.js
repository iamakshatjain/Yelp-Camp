var express = require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");

//connecting mongoose
mongoose.connect("mongodb://localhost:/yelpcamp",{ useNewUrlParser: true });

app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var comment = require("./models/comments");
var campground = require("./models/campgrounds");
var seedDB = require("./seed");

seedDB();//seed data

//landing or home
app.get("/",function(req,res){
	res.render("landing");
});

//INDEX-to display all the available campgrounds
app.get("/campgrounds",function(req,res){

	campground.find({},function(err,camps){
		if(err){
			console.log("error from line#78")
			console.log(err);
		}
		else
			res.render("campgrounds/index",{camps:camps});
	})
});

//NEW-display form for new campground
app.get("/campgrounds/new",function(req,res){//the form for adding a new camp ground
	res.render("campgrounds/new");//this sends a post request to the /campgrounds
});

//CREATE-to create new campground into the db
app.post("/campgrounds",function(req,res){//to add to the campgrounds
	var camp={location:"",image:"",desc:""}
	camp.location=req.body.location;
	camp.image=req.body.image;
	camp.desc=req.body.desc;
	// camps.push(camp);
	campground.create(camp,function(err,camp){
		if(err)
			console.log(err);
		else
		{
			console.log("new campground added");
			console.log(camp);
		}
	});
	res.redirect("/campgrounds");
});

//SHOW-to show the details of particular campsites
app.get("/campgrounds/:id",function(req,res){
	var id=req.params.id;
	campground.findById(id).populate("comments").exec(function(err,camp){//important method findById
		if(err)
		{
			console.log("there is an error in line#66");
			console.log(err);
		}
		else
		{
			res.render("campgrounds/show",{camp:camp});
		}
	});
});

//comments routes
//NEW
app.get("/campgrounds/:id/comments/new",function(req,res){
	var id = req.params.id;
	res.render("comments/new",{id:id});
});

//CREATE
app.post("/campgrounds/:id/comments",function(req,res){
	var id=req.params.id;

	campground.findById(id,function(err,camp){
		if(err)
			console.log(err);
		else{
				comment.create({
					content:req.body.content,
					author:req.body.author
				},function(err,commentrec){
					if(err)
						console.log(err);
					else
					{
						console.log(commentrec);
						camp.comments.push(commentrec);
						camp.save(function(err){
							if(err)
								console.log(err);
							else
								res.redirect("/campgrounds/"+id);
						});
					}
				});
			}
	});
	// res.send("comment added");
});

app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("The yelp camp server is serving");
})