var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
var handlebars = require('express3-handlebars')
			.create({ defaultLayout:'main'});
app.use(express.static(__dirname+'/public'));
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT || 3000 );
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost/test');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	nickname:String,
	email:String,
	password:String,
	age:Number,
	rank:Number,
	games:Number,
	points:Number	
});
var User = mongoose.model("User",UserSchema);
app.get('/', function(req, res){
	if(req.cookies.Spanz){
		User.findById(req.cookies.Spanz,function(err, user){
			if(user)		
			res.render('gamepage',{pagename: 'Game',style:"game.css"});
		});	
	}else{
		if(req.query.usr&&req.query.pwd){
			User.findOne({"email":req.query.usr,"password":req.query.pwd},function(err,user) {
				if(user){
					console.log(user);
					res.cookie("Spanz",user._id);
					res.render('gamepage',{pagename: 'Game',style:"game.css"});
				}else
					res.render('login',{pagename: 'Login',style:"login.css"});
			});

			}else{
		
			res.render('login',{pagename: 'Login',style:"login.css"});
		}
	}
}); 

app.get('/game', function(req, res){
	if(req.xhr==true){
	res.type('application/json');
	res.send("where our app will be");
		
	}else res.redirect(303,'/');
});

app.get('/register',function (req, res){
	res.render('register',{pagename:'Inregistrare',style:'register.css'});
});
app.post('/register/new',function (req,res){
	var nick= req.body.nick;
	var emailin= req.body.email;
	var passwordin =  req.body.password;
	var agein =  req.body.age;
	var newUser = new User({ nickname: nick,email:emailin,password:passwordin,age:agein });
	console.log(newUser);
		newUser.save(function (err) {
		  if (err) res.send("error");
		  res.send("OK");
		})

});
app.use(function(req,res,next){	
	res.status(404);
	res.render('404page',{pagename:"Not Found",style:'404.css'});
});
app.listen(app.get('port'),function(){
	console.log( 'Express started at http://localhost:'+
	app.get('port')+ '; press Ctrl-C to terminate.' );

});
