
// same config used in Express app.js,
// helps avoid passing references to config for every exported function here
var config        = require('../config');


exports.default = function(req, res) {

  return;
};


exports.users = function(User) {

//console.log('env: ' + process.env.NODE_ENV);
//console.log('host: ' + config.env.host);

  return function(req, res) {
    User.find({}, function(err, users) {
      //res.json({users:users});
      //var richard = {namefirst:'Richard', namelast:'Fedoriuk', gender:'male', age:51};
      //var george = {namefirst:'George', namelast:'Gigo', gender:'male', age:48};

      // configure response for CORS access
      set_cors_access(res);

      //res.json([richard,george]);
      //res.json({users:users});
      res.json(users);
    });
  };
};




/*
 * Configure response headers for CORS:
 * ------------------------------------
 *
 * Note that it is necessary to add these headers (call this function)
 * for every request method coming from a foreign source, this
 * means calling this function for GET, OPTIONS, POST, PUT, DELETE etc.
 */
var set_cors_access = function(responseObj) {

  //var envhost = config

  // set response headers for CORS configuration
  //responseObj.set('Content-Type', 'text/plain');

  responseObj.set({
    'Access-Control-Allow-Origin': 'http://' + config.env.host,
    'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS, X-XSRF-TOKEN',
    'Access-Control-Allow-Headers': 'Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With'
  });
};




exports.options = function(req, res) {

      // configure response for CORS access
      set_cors_access(res);

      res.status(200);
      res.json({status:200});
};




// app.post('/users', api.addNewUser(User));
exports.addNewUser = function(User) {

  var SIMULATE_ERROR = false;
  return function(req, res) {

    // configure response for CORS access
    set_cors_access(res);

    if( SIMULATE_ERROR === true ) {
      simulate_error(res);
      //return;
    } else {

      var user = new User(req.body);
      user.save(function(error, user) {
        if (error || !user) {
          res.json({ error : error });
        } else {
          //res.json({ msg : msg });
          res.jsonp(user);
          //res.json({users:user});
        }
      });
    }
  };

};




exports.getUser = function(User) {

  return function(req, res) {
    // configure response for CORS access
    set_cors_access(res);

    //var user = new User();
    User.findOne( {namelast:req.params.userid}, function(error,user) {

        if (error || !user) {
          res.json({ error : error });
        } else {
          //res.json({ msg : msg });
          res.json(user);
          //res.json({users:user});
        }
    });
  };
};


function simulate_error(res) {

  // optionally set the status explicitly
  //res.status(503);

  // or set status in the json response
  // the json object sent can be retrieved from the error.data
  // the status sent is retrieved from error.status
  res.json(503, {message:"This is a simulated ERROR", num:'999'});
}
