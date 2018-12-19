var mongoose = require("mongoose");
var campground = require("./models/campgrounds");
var comment = require("./models/comments");

var data = [
	{
		location:"Ohio",
		image:"https://images.unsplash.com/photo-1515408320194-59643816c5b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur purus at enim dapibus hendrerit et in mauris. Nam tellus sem, varius sed facilisis sit amet, egestas nec justo. Nunc venenatis iaculis turpis, vel aliquam arcu suscipit a. Curabitur eget aliquam mi. Donec auctor luctus pharetra. Ut neque sapien, vulputate vitae tortor eget, convallis feugiat tellus. Cras metus augue, suscipit nec augue quis, varius interdum felis. Quisque auctor urna et scelerisque vehicula. Nunc vel egestas nulla, sed dignissim quam. Fusce condimentum ornare felis non porttitor."
	},
	{
		location:"Whiteacre",
		image:"https://images.unsplash.com/photo-1533575770077-052fa2c609fc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur purus at enim dapibus hendrerit et in mauris. Nam tellus sem, varius sed facilisis sit amet, egestas nec justo. Nunc venenatis iaculis turpis, vel aliquam arcu suscipit a. Curabitur eget aliquam mi. Donec auctor luctus pharetra. Ut neque sapien, vulputate vitae tortor eget, convallis feugiat tellus. Cras metus augue, suscipit nec augue quis, varius interdum felis. Quisque auctor urna et scelerisque vehicula. Nunc vel egestas nulla, sed dignissim quam. Fusce condimentum ornare felis non porttitor."
	},
	{
		location:"Arizona",
		image:"https://images.unsplash.com/photo-1517398658731-17b18f07b5dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
		desc:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur purus at enim dapibus hendrerit et in mauris. Nam tellus sem, varius sed facilisis sit amet, egestas nec justo. Nunc venenatis iaculis turpis, vel aliquam arcu suscipit a. Curabitur eget aliquam mi. Donec auctor luctus pharetra. Ut neque sapien, vulputate vitae tortor eget, convallis feugiat tellus. Cras metus augue, suscipit nec augue quis, varius interdum felis. Quisque auctor urna et scelerisque vehicula. Nunc vel egestas nulla, sed dignissim quam. Fusce condimentum ornare felis non porttitor."
	}
]


function seedDB()
{
	comment.deleteMany({},function(err){
		if(err)
			console.log(err);
		else{

			console.log("removed comments");

			campground.deleteMany({},function(err){//model.remove() is a deprecated method now
			if(err)
				console.log(err);
			else
			{
				console.log("removed campgrounds");
				data.forEach(function(seed){//we keep this inside the callback intentionally
					campground.create(seed,function(err,adcamp){
						if(err)
							console.log(err);
						else
							{
								console.log("campground created");
								comment.create({
									content:"This is a very nice place and I am thrilled to be here",
									author:"Young Dumb"
								},function(err,com){
									if(err)
										console.log(err);
									else
									{
										console.log("comment created");
										adcamp.comments.push(com);
										adcamp.save();
									}
								});
							}
					});
				});
			}
		});

			}
	});
	}

module.exports = seedDB;
