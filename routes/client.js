
exports.default = function(req, res) {

  var title = "Registration Test";

  if( req.path === '/userprofile') {
    title = "User Profile";
  }

  res.render( 'index.html', { title: title, debug: req.path } );


};
