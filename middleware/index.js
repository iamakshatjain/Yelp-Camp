var middleware = {};
var comment = require("../models/comments");
var campground = require("../models/campgrounds");

middleware.isCommentAuthorized = function(req,res,next){
	let comment_id=req.params.comment_id;
	comment.findById(comment_id,function(err,foundComment){
		if(req.isAuthenticated()){//user is logged in
			if(req.user._id.equals(foundComment.author.id))//to check if the user is the owner
				return next();
			else{// if the user is not the owner
				// res.send("You are not authorized");
				req.flash("error","Your are not authorised");
				res.redirect("back");
			}
		}else{//user is not logged in
			req.flash("error","You must be logged in");
			res.redirect("/login");
		}
	});
}

middleware.isLoggedIn = function(req,res,next){
	if(req.isAuthenticated())
	{
		return next();
	}
	else
	{
		req.flash("error","You must login first");
		res.redirect("/login");
	}
}

middleware.isCampgroundAuthorized = function(req,res,next){//to check if the logged in user is the owner
	campground.findById(req.params.id,function(err,foundCamp){
		if(err){//if the campground doesn't exist
			console.log(err);
			res.redirect("/campgrounds");
		}
		else{//if the campground does exist
			if(req.isAuthenticated()){//if the user is logged in
				if(req.user._id.equals(foundCamp.author.id))//it the logged in user is the owner
					return next();
				//not owner
				// res.send("You are not authorised");
				req.flash("error","Your are not authorised");
				res.redirect("back");
			}
			else{//user is not logged in
				// res.send("please login first");
				req.flash("error","You must be logged in");
				res.redirect("/login");
			}

		}
	});
}

module.exports = middleware;