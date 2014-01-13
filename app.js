
/**
 * Module dependencies.
 */

var express				= require('express');
var api					= require('./routes/api');
var client				= require('./routes/client');
var http				= require('http');
var path				= require('path');
var app					= express();
var config 				= require('./config');
var Mongoose 			= require('mongoose');
var db					= Mongoose.createConnection('localhost', 'mythird-ng'); // db is 'mythird-ng'



console.log('config: ' +  config.env.host + " " + config.env.port);


var UserProfileSchema 	= new Mongoose.Schema({
  namefirst: 	{type:String, required:true},
  namelast: 	{type:String, required:true},
  gender: 		{type:String},
  age: 			{type:Number}
});

var User = db.model('userprofiles', UserProfileSchema); // collection is 'userprofiles'


app.configure( 'development', function() {
//	app.set('port', process.env.PORT || config.env().port);
 	app.use(express.errorHandler());
});

//app.configure( 'production', function() {
//	app.set('port', process.env.PORT || config.env().port);
//});
app.set('port', process.env.PORT || config.env.port);



// RCF: 'views' dir likely not used much, since nodejs is used mostly for REST calls
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// RCF: 'public' dir likely not used much, since nodejs is used mostly for REST calls
app.use(express.static(path.join(__dirname, 'public')));



/*
 * Node/Express (serverside) routes:
 *  - ensure these are not defined in Angular's app.js $routeProvider:
 */
app.get('/api', 			api.default);
app.get('/users', 			api.users(User));
app.get('/users/:userid', 	api.getUser(User));
app.options('/users', 		api.options);
app.post('/users', 			api.addNewUser(User));



/*
 * Angular (client) routes:
 * --------------------------
 * These routes will fallback to Angular for resolution of any uri:
 * Note that the * wildcard will not work, hence the alternate regex
 * It is crucial that 'static' assets never be referenced with a leading
 * forward slash '/', else they'll match this rule and 404's will occur
 *
 * //app.get('/', routes.index);
 * //app.get('/users', user.list);
 */

//app.get('*', routes.risk); // note: this doesn't seem to work...
app.get('/[a-zA-Z0-9._#?&+% -]{0,255}', client.default); // all other routes fall to angular



http.createServer(app).listen(app.get('port'), function(){
  console.log(process.env.NODE_ENV + ': Express server listening on port ' + app.get('port'));
});
