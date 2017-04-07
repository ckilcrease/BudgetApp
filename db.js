// db.js

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

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

//Pasted from deployment instructions:
// is the environment variable, NODE_ENV, set to PRODUCTION? 
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/finalproject';
}

mongoose.connect(dbconf);
