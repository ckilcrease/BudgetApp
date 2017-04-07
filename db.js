// db.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const fs = require('fs');

// users
// the site requires authentication (username/password)
// users can have multiple purchases
const User = new mongoose.Schema({
	//username provided by authentication plugin
	//password hash provided by authentication plugin
	totBudget: {type: Number, min: 0}, //overall budget designated
	remTotBudget: {type: Number}, //"remaining" overall budget
	purchases: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Purchase' }]
});

User.plugin(passportLocalMongoose);

// purchases
const Purchase = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  	cost: {type: Number, min: 0, required: true},
 	items: {type: String, required: false},
 	date: {type: Date, required: false}
});

mongoose.model('User', User);
mongoose.model('Purchase', Purchase);

if (process.env.NODE_ENV === PRODUCTION){

}

