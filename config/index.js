/*
 * config for Node/Express server side
 */

 var config = function() {
 	
 	return {
 		development: {
	 		port: 3000,
	 		host: 'dev-mythird-ng'
	 	},
	 	production: {
	 		port: 3001,
	 		host: 'prod-mythird-ng'
	 	}
	 };
 };
 

exports.env = config()[process.env.NODE_ENV];


