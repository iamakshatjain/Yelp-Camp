//dependencies
var express = require("express");
var app=express();
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var passport = require("passport");
var localStrategy = require("passport-local");
var expressSession= require("express-session");

//requiring the routes
var commentRoutes = require("./routes/commentRoutes");
var campgroundRoutes = require("./routes/campgroundRoutes");
var authRoutes = require("./routes/authRoutes");

//connecting mongoose
var url = process.env.DATABASEURL || "mongodb://localhost/yelpcamp";
mongoose.connect(url,{ useNewUrlParser: true });

app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

//requiring the models
var comment = require("./models/comments");
var User = require("./models/user");
var campground = require("./models/campgrounds");

//seeding the app
var seedDB = require("./seed");
// seedDB();//seed data

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

//using the routes
app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(authRoutes);

//setting the listening of server
app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("The yelp camp server is serving");
})