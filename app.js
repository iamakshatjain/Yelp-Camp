//dependencies
var express = require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var expressSession= require("express-session");
var methodOverride = require("method-override");

//requiring the routes
var commentRoutes = require("./routes/commentRoutes");
var campgroundRoutes = require("./routes/campgroundRoutes");
var authRoutes = require("./routes/authRoutes");

//connecting mongoose
var localURL = "mongodb://localhost/yelpcamp";
var databaseURL = "mongodb://akshat:akshat99@ds145484.mlab.com:45484/yelp-camp";
// var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";
var url = localURL || databaseURL;
mongoose.connect(url,{ useNewUrlParser: true });

app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//requiring the models
var comment = require("./models/comments");
var User = require("./models/user");//the name here is same as the model
var campground = require("./models/campgrounds");

//seeding the app
var seedDB = require("./seed");
// seedDB();//seed data

//passport configuration
app.use(expressSession({//we maintain the order expressSession -> app.use(expressSession) -> passport.initialize()
	secret:"Akshat Jain",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());//to initialize the passport session
app.use(passport.session());//to handle the sessions

passport.use(new localStrategy(User.authenticate()));//to use the localStrategy for requests
passport.serializeUser(User.serializeUser());//to encrypt user to the database
passport.deserializeUser(User.deserializeUser());//to decrypt the user to database
app.use(function(req,res,next){//to pass this to all the templates
	res.locals.currentUser = req.user;
	next();
});

//using the routes
app.use("/campgrounds/:id/comments",commentRoutes);//appends all the routes with this string in the begining
app.use("/campgrounds",campgroundRoutes);
app.use("/",authRoutes);

//setting the listening of server
app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("The yelp camp server is serving");
})