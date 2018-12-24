var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user")

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
				res.redirect("/register");
			}
		else
		{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/campgrounds");
			})
		}
	});
});

router.get("/login",function(req,res){
	res.render("login");
});

router.post("/login",passport.authenticate("local",
	{
		successRedirect : "/campgrounds",//to go back to the same page
		failureRedirect : "/login",
	}),function(req,res){
	console.log(req.user);
});

router.get("/logout",function(req,res){
	req.logout();
	res.redirect("/campgrounds");
	console.log("user logged out");
});

//middleware
function isLoggedIn(req,res,next){
	if(req.isAuthenticated())
	{
		return next();
	}
	else
	{
		res.redirect("/login");
	}
}

module.exports = router;