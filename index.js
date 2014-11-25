var _ = require('lodash'),
	DryCrud,
	prototypes = {};

prototypes.mongoose = require("./lib/mongoose-prototype");
prototypes.mongo = require("./lib/mongo-prototype");
prototypes.utils = require("./lib/utils-prototype");

var DryCrud = function(config){
	
	//Check for required config
	if(!config.collection || !config.type){

		console.log("dryCrud error: you must provide a database object and type");

		return false;

	}

	//If the DryCrud object has not yet been instanciated
	if (!(this instanceof DryCrud)) {

		//Check the type provided
		if(config.type === 'mongoose'){
			
			//Add the appropriate prototype
			DryCrud.prototype = _.merge(prototypes.utils, prototypes.mongoose);

		}else if(config.type === 'mongo-native' || config.type === 'mongodb'){
			DryCrud.prototype = _.merge(prototypes.utils, prototypes.mongo);
		}
		
		//Create the DryCrud object
		return new DryCrud(config);

	}

	//Consume any configuration
	this.collection = config.collection;

};



module.exports = DryCrud;
