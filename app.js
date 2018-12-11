var express = require("express");
var app=express();
var bodyParser=require("body-parser");

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
	res.render("landing");
});

var camps = [
		{
			location:"Tsomoriri Camp",
			image:"https://cincinnatiusa.com/sites/default/files/styles/article_full/public/attractionphotos/Winton%20Woods%20Campground.JPG?itok=xqTUl4YJ"
		},
		{
			location:"Jaipur campgrounds",
			image:"http://www.tourideas-usa.com/home/infos/fotos/super04.jpg"
		},
		{
			location:"New Delhi campgrounds",
			image:"https://www.tripsavvy.com/thmb/FlJvHzJ3A8pTHcbHS46zYDdHhmk=/870x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/102145689-56a0e43d5f9b58eba4b4e578.jpg"
		},
		{
			location:"Camp Exotica",
			image:"https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201__340.jpg"
		},
		{
			location:"Rishikesh Valley",
			image:"https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402__340.jpg"
		},
		{
			location:"Dehradun",
			image:"https://cdn.pixabay.com/photo/2016/11/21/15/14/camping-1845906__340.jpg"
		},
		{
			location:"Manali grounds",
			image:"https://cdn.pixabay.com/photo/2015/10/12/14/57/campfire-984020__340.jpg"
		},
		{
			location:"Shimla shelters",
			image:"https://cdn.pixabay.com/photo/2016/11/22/23/08/adventure-1851092__340.jpg"
		},
		{
			location:"Nameri Eco Camp",
			image:"https://cdn.pixabay.com/photo/2014/11/27/18/36/tent-548022__340.jpg"
		},

	];

app.get("/campgrounds",function(req,res){
	
	res.render("campgrounds",{camps:camps})
});

app.post("/campgrounds",function(req,res){//to add to the campgrounds
	var camp={location:"",image:""}
	camp.location=req.body.location;
	camp.image=req.body.image;
	camps.push(camp);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new",function(req,res){//the form for adding a new camp ground
	res.render("new.ejs");
});

app.listen(process.env.PORT || 3000,process.env.IP,function(){
	console.log("The yelp camp server is serving");
})