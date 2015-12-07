var express = require('express');

function existsInDB(usr, pwd){//needs editing when mysql functionality installed
	if(usr=="me"&&pwd=="hi")return 1;
	else return 0;
}
function insertUser()

var app = express();
var handlebars = require('express3-handlebars')
			.create({ defaultLayout:'main'});
app.use(express.static(__dirname+'/public'));
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT || 3000 );

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.get('/', function(req, res){
	var id = req.param('usr');
	var password= req.param('pwd');
	if(existsInDB(id,password))
		res.render('gamepage',{pagename: 'Game',style:"game.css"});
	else
		res.render('login',{pagename: 'Login',style:"login.css"});
}); 
app.get('/game', function(req, res){
	res.type('text/plain');
	res.send('Game JSON generation');
});
app.use(function(req,res,next){
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not found');
});
app.get('/register',function (req, res){
	res.render('register');
});
app.post('/register/new',function (req,res){
	var nickname=req.body.nick;
	var email=req.body.email;
	var password = req.body.password;
	var age = req.body.age;
	if(!(nickname&&email&&password&&age))
		res.render('regfail');
	if(insertUser(nickname,email,password,age));
		res.render('regsuccess');
	else
		res.render('regfail');
});
app.listen(app.get('port'),function(){
	console.log( 'Express started at http://localhost:'+
	app.get('port')+ '; press Ctrl-C to terminate.' );

});
