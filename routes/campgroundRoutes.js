var express = require("express");
var router = express.Router();
var campground = require("../models/campgrounds");
var middleware=require("../middleware/index");

//INDEX-to display all the available campgrounds
router.get("/",function(req,res){

	campground.find({},function(err,camps){
		if(err){
			console.log("error from line#78")
			console.log(err);
		}
		else
			// console.log(req.user);
			res.render("campgrounds/index",{camps:camps});
	})
});

//NEW-display form for new campground
router.get("/new",middleware.isLoggedIn,function(req,res){//the form for adding a new camp ground
	res.render("campgrounds/new");//this sends a post request to the /campgrounds
});

//CREATE-to create new campground into the db
router.post("/",function(req,res){//to add to the campgrounds
	console.log(req.user);
	// var camp={location:"",image:"",desc:""};
	var camp = new campground({});//to make new campground of type campground(imported above)
	camp.location=req.body.location;
	camp.image=req.body.image;
	camp.author.id=req.user._id;//every where req.user is the current user being used
	camp.author.username=req.user.username;
	camp.desc=req.body.desc;
	// camps.push(camp);
	campground.create(camp,function(err,camp){
		if(err)
			console.log(err);
		else
		{
			console.log("new campground added");
			// console.log(camp);
		}
	});
	res.redirect("/campgrounds");
});

//SHOW-to show the details of particular campsites
router.get("/:id",function(req,res){
	var id=req.params.id;
	campground.findById(id).populate("comments").exec(function(err,camp){//important method findById
		if(err)
		{
			console.log("there is an error in line#66");
			console.log(err);
		}
		else
		{	
			console.log(camp);
			res.render("campgrounds/show",{camp:camp});
		}
	});
});

//EDIT - To show the edit form for the campground
router.get("/:id/edit",middleware.isCampgroundAuthorized,function(req,res){
	campground.findById(req.params.id,function(err,foundCampground){
		if(err){
			console.log("error in line #67");
			console.log(err);
		}else{
			res.render("campgrounds/edit",{campground:foundCampground});	
		}
	});
});

//UPDATE - To update the campground in the database
router.put("/:id",middleware.isCampgroundAuthorized,function(req,res){
	campground.findByIdAndUpdate(req.params.id,{$set:{image : req.body.image,desc : req.body.desc,location : req.body.location}},function(err,updatedCampground){
		if(err){
			console.log("err in line #83");
			console.log(err);
		}else{
			console.log("campground updated");
			// console.log(updatedCampground);
			res.redirect("/campgrounds/"+req.params.id);//to redirect back to the show page to review the changes
		}
	});
});

//DELETE - To destroy the campground
router.delete("/:id",middleware.isCampgroundAuthorized,function(req,res){
	campground.findByIdAndDelete(req.params.id,function(err){
		res.redirect("/campgrounds");
	});
});

module.exports = router;