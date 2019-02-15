var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username:String,
	password:String
});

userSchema.plugin(passportLocalMongoose);//to add the authentication methods available in passport-local-mongoose

module.exports = mongoose.model("User",userSchema);