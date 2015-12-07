var express = require('express');


function existsInDB(usr,pwd){
	return 1;

}

var app = express();
var handlebars = require('express3-handlebars')
			.create({ defaultLayout:'main'});
app.use(express.static(__dirname+'/public'));
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT || 3000 );

app.get('/', function(req, res){
	if(existsInDB(req.query.usr,req.query.pwd))
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
app.listen(app.get('port'),function(){
	console.log( 'Express started at http://localhost:'+
	app.get('port')+ '; press Ctrl-C to terminate.' );

});
