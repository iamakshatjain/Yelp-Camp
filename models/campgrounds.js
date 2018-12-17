var mongoose = require("mongoose");

//schema for campgrounds
var campgroundSchema = new mongoose.Schema({
	location:String,
	image:String,
	desc:String,
	comments:[
		{
			type:mongoose.Schema.Types.ObjectId,
			ref:"comment"
		}
	]
});

module.exports = mongoose.model("campground",campgroundSchema);
 //this creates a collection named as campgrounds
