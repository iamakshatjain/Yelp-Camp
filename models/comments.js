var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
	content:String,
	author:String
});

module.exports = mongoose.model("comment",commentSchema);//here this comment must be same as the model name