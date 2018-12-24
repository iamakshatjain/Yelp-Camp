var express = require("express");
var router = express.Router();
var campground = require("../models/campgrounds");

//INDEX-to display all the available campgrounds
router.get("/campgrounds",function(req,res){

	campground.find({},function(err,camps){
		if(err){
			console.log("error from line#78")
			console.log(err);
		}
		else
			console.log(req.user);
			res.render("campgrounds/index",{camps:camps});
	})
});

//NEW-display form for new campground
router.get("/campgrounds/new",function(req,res){//the form for adding a new camp ground
	res.render("campgrounds/new");//this sends a post request to the /campgrounds
});

//CREATE-to create new campground into the db
router.post("/campgrounds",function(req,res){//to add to the campgrounds
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
router.get("/campgrounds/:id",function(req,res){
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

module.exports = router;