var express = require('express');
var cookieParser = require('cookie-parser');
function existsInDB(usr, pwd){//needs editing when mysql functionality installed
	if(usr=="me@gmail.com"&&pwd=="hi")return 1;
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

app.use(cookieParser());
app.get('/', function(req, res){
	
		var id =  req.param('usr');
		var password=  req.param('pwd');
	
	if(existsInDB(id,password)){
		res.cookie('spanzusr',id);
		res.cookie('spanzpwd',password);
		res.render('gamepage',{pagename: 'Game',style:"game.css"});
	}
	else
		res.render('login',{pagename: 'Login',style:"login.css"});
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
	var nickname= req.body.nick;
	var email= req.body.email;
	var password =  req.body.password;
	var age =  req.body.age;
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
