// app.js

require('./db');
require('./auth');

const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	path = require('path'),
	bodyParser = require('body-parser'),
	User = mongoose.model('User'),
	Purchase = mongoose.model('Purchase');

const app = express();


// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'session secret',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

//enable passport middleware
app.use(passport.initialize()); //to start up passport
app.use(passport.session()); //to enable persistent login sessions

//from lecture slides on authentication/passport: 
//middleware that drops req.user into context of every template:
app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));



//route handling (authentication-related ones from/based on lecture 
//notes and demo):
app.get('/', (req, res) => {
	Purchase.find({user: req.user}, (err, purs) => {
		//if no errors, purs will contain all purchases made by
		//user (for use in form)
		if (err){
			console.log(err);
		}
		else{
			res.render('index', {purList: purs});
		}
	});
});

app.post('/', (req,res) => {
	Purchase.findOne({user: req.user, _id: req.body.showPur}, (err, sP) => {
		if (err){
			console.log(err);
		}
		else{
			res.render('details', {pur: sP});
		}
	});
});

app.get('/addPurchase', (req, res) => {
	if (req.user){
		res.render('addPur');
	}
	else{
		res.render('mustLogin');
	}
});

app.post('/addPurchase', (req, res) => {
	if (req.body.newPur !== null){
		//new purchase was added in form
		const np = new Purchase({user: req.user,
			cost: req.body.price,
			items: req.body.descrip,
			date: req.body.date
		});
		np.save((err) => {
			if (err){
				res.send(err);
				console.log(err);
			}
			else{
				User.findOneAndUpdate({username: req.user.username},
					{$push: {purchases: np}, $inc: {remTotBudget: (-1)*np.cost}},
					(err, user, count) => {
						if (err){
							res.send(err);
							console.log(err);
						}
						else{
							res.render('addPur', {success: true});
						}
					});
			}
		});
	}
});


app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', (req, res, next) => {
	//custom version of authenticate
	passport.authenticate('local', (err, user) => {
		if (err){
			console.log(err);
			res.send("An error occurred...");
		}
		else if (user){
			req.logIn(user, (err) => {
				res.redirect('/');
			});
		}
		else{
			res.render('login', {message: 'Your login information is incorrect'});
		}
	})(req, res, next);
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	User.register(new User({username: req.body.username, 
		totBudget: req.body.totBudg, remTotBudget: req.body.totBudg}),
		req.body.password, (err, user) => {
			if (err){
				res.render('register',{message: 'Your registration information is not valid'});
			}
			else{
				//authenticate so that user is logged in
				passport.authenticate('local')(req, res, function(){
					res.redirect('/');
				});
			}
	});
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});


app.listen(3000); 