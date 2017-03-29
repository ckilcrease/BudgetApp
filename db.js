// db.js
// FIRST DRAFT DATA MODEL

const mongoose = require('mongoose');

// users
// the site requires authentication (username/password)
// users can have multiple purchases and categories of spending
const User = new mongoose.Schema({
	//username provided by authentication plugin
	//password hash provided by authentication plugin
	categs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
	purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }]
});

// a purchase
const Purchase = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  	cost: {type: Number, min: 0, required: true},
 	items: {type: String, required: false},
  	categs: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
});

// a category of spending
const Category = new mongoose.Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
 	budget: {type: Number, required: false},
  	name: {type: String, required: false}
})