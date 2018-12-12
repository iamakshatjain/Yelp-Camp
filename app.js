var express = require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
//connecting mongoose
mongoose.connect("mongodb://localhost:/yelpcamp",{ useNewUrlParser: true });

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
	res.render("landing");
});

//schema for campgrounds
var campgroundSchema = new mongoose.Schema({
	location:String,
	image:String,
	desc:String
});

//creating model for campgrounds
//INDEX-to display all the available campgrounds
var campground = mongoose.model("campground",campgroundSchema);//this creates a collection named as campgrounds

app.get("/campgrounds",function(req,res){

	campground.find({},function(err,camps){
		if(err){
			console.log("error from line#78")
			console.log(err);
		}
		else
			res.render("index",{camps:camps});
	})
});

//NEW-display form for new campground
app.get("/campgrounds/new",function(req,res){//the form for adding a new camp ground
	res.render("new.ejs");//this sends a post request to the /campgrounds
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
	campground.findById(id,function(err,camp){//important method findById
		if(err)
		{
			console.log("there is an error in line#66");
			console.log(err);
		}
		else
		{
			res.render("show",{camp:camp});
		}
	});
});

app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("The yelp camp server is serving");
})