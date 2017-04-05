// db.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// users
// the site requires authentication (username/password)
// users can have multiple purchases and categories of spending
const User = new mongoose.Schema({
	//username provided by authentication plugin
	//password hash provided by authentication plugin
	totBudget: {type: Number, min: 0}, //overall budget
	categs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
	purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }]
});

User.plugin(passportLocalMongoose);

// a purchase
const Purchase = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  	cost: {type: Number, min: 0, required: true},
 	items: {type: String, required: false},
  	categ: {type: mongoose.Schema.Types.ObjectId, ref: 'Category'}
});

// a category of spending
const Category = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 	budget: {type: Number, required: false}, 
 	//****NOTE: adjust this so that the total budget can be allocated
 	//instead of any amount being entered
  	name: {type: String, required: true}
});

mongoose.model('User', User);
mongoose.model('Purchase', Purchase);
mongoose.model('Category', Category);

mongoose.connect('mongodb://localhost/finalproject');