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
				res.send("You are not authorized");
			}
		}else{//user is not logged in
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
				res.send("You are not authorised");
			}
			else{//user is not logged in
				// res.send("please login first");
				res.redirect("/login");
			}

		}
	});
}

module.exports = middleware;