var express = require('express');
var cookieParser = require('cookie-parser');
var expressSanitizer = require('express-sanitizer');
function existsInDB(usr, pwd){//needs editing when mysql functionality installed
	if(usr=="me"&&pwd=="hi")return 1;
	else return 0;
}
function insertUser(nickname,email,password,age){
	return 1;
}
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
app.use(expressSanitizer[options]);
app.use(cookieParser());
app.get('/', function(req, res){
	
		var id =  req.sanitize(req.param('usr'));
		var password=  req.sanitize(req.param('pwd'));
	
	if(existsInDB(id,password)){
		res.cookie('spanzusr',id);
		res.cookie('spanzpwd',password);
		res.render('gamepage',{pagename: 'Game',style:"game.css"});
	}
	else
		res.render('login',{pagename: 'Login',style:"login.css"});
}); 
app.get('/game', function(req, res){
	res.type('text/plain');
	res.send('Game JSON generation');
});

app.get('/register',function (req, res){
	res.render('register',{pagename:'Inregistrare',style:'register.css'});
});
app.post('/register/new',function (req,res){
	var nickname= req.sanitize(req.body.nick);
	var email= req.sanitize(req.body.email);
	var password =  req.sanitize(req.body.password);
	var age =  req.sanitize(req.body.age);
	if(!(nickname&&email&&password&&age))
		res.render('regfail',{pagename:'Eroare',style:'regfail.css'}); 
	else{
		if(insertUser(nickname,email,password,age))
			res.render('regsuccess',{pagename:'Succes',style:'regsuccess.css'});
		else
			res.render('regfail',{pagename:'Eroare',style:'regfail.css'});
	}
});
app.use(function(req,res,next){	
	res.status(404);
	res.render('404page',{pagename:"Not Found",style:'404.css'});
});
app.listen(app.get('port'),function(){
	console.log( 'Express started at http://localhost:'+
	app.get('port')+ '; press Ctrl-C to terminate.' );

});
