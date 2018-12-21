var express = require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var expressSession= require("express-session");

//connecting mongoose
mongoose.connect("mongodb://localhost:/yelpcamp",{ useNewUrlParser: true });

app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

var comment = require("./models/comments");
var User = require("./models/user");
var campground = require("./models/campgrounds");
var seedDB = require("./seed");

seedDB();//seed data

//passport configuration
app.use(expressSession({
	secret:"Akshat Jain",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){//to pass this to all the templates
	res.locals.currentUser = req.user;
	next();
});

//landing or home
app.get("/",function(req,res){
	// console.log(req.user);
	res.render("landing",{currentUser : req.user});
});

//INDEX-to display all the available campgrounds
app.get("/campgrounds",function(req,res){

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
app.get("/campgrounds/:id/comments/new",isLoggedIn,function(req,res){
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


//auth routes
app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
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

app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login",passport.authenticate("local",
	{
		successRedirect : "/campgrounds",//to go back to the same page
		failureRedirect : "/login"
	}),function(req,res){
	console.log(req.user);
});

app.get("/logout",function(req,res){
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

app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("The yelp camp server is serving");
})