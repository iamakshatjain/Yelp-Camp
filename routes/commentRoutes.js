var express = require("express");
var router = express.Router({mergeParams:true});
var comment = require("../models/comments");
var campground = require("../models/campgrounds");

//comments routes
//NEW
router.get("/new",isLoggedIn,function(req,res){
	var id = req.params.id;
	res.render("comments/new",{id:id});
});

//CREATE
router.post("/",function(req,res){
	var id=req.params.id;

	campground.findById(id,function(err,camp){//to find the campground to add the comment to 
		if(err)
			console.log(err);
		else{
				var newComment= new comment({});
				newComment.content=req.body.content;
				newComment.author.id=req.user._id;
				newComment.author.username=req.user.username;
				comment.create(newComment
				// 	{
				// 	content:req.body.content,
				// 	author:req.body.author
				// }
				,function(err,commentrec){
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
});

//EDIT - To display an edit form for the comment
router.get("/:comment_id/edit",function(req,res){
	comment.findById(req.params.comment_id,function(err,foundComment){
		if(err)
		{
			console.log(err);
			res.redirect("back");
		}
		else{
			// console.log(foundComment);
			res.render("comments/edit",{campground_id:req.params.id,comment:foundComment});
		}
	});
});

//UPDATE - To make changes to the database
router.put("/:comment_id",function(req,res){
	comment_id = req.params.comment_id;//this is the comment id
	comment.findByIdAndUpdate(comment_id,{$set:{content:req.body.content}},function(err,body){
		if(err){
			console.log(err);
		}else{
			console.log("comment updated");
			res.redirect("/campgrounds/"+req.params.id);
		}
	});
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