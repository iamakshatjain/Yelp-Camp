var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");
var middleware=require("../middleware/index");

//landing or home
router.get("/",function(req,res){
	// console.log(req.user);
	res.render("landing",{currentUser : req.user});
});

//auth routes
router.get("/register",function(req,res){
	res.render("register");
});

router.post("/register",function(req,res){
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err)
			{
				console.log(err);
				req.flash("error",err.message);
				res.redirect("/register");
			}
		else
		{
			passport.authenticate("local")(req,res,function(){
				req.flash("success","Welcome to YelpCamp "+req.user.username);
				res.redirect("/campgrounds");
			})
		}
	});
});

router.get("/login",function(req,res){
	req.flash("error");//directly linked with passport's failureFlash
	req.flash("success");
	res.render("login");
});

router.post("/login",passport.authenticate("local",
	{
		successRedirect : "/campgrounds",//to go back to the same page
		failureRedirect : "/login",
		failureFlash : true,//this make the login form to have the error message to be flashed
		successFlash : "Successfully logged in"
	}),function(req,res){
	console.log(req.user);
});

router.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Logged out successfully");
	res.redirect("/campgrounds");
	console.log("user logged out");
});

module.exports = router;