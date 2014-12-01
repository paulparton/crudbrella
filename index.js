var _ = require('lodash'),
	utils = require("./lib/utils-prototype"),
	Crudbrella;

Crudbrella = function(config){
	
	//Check for required config
	if(!config.collection || !config.type){

		//Raise an error here...
    	console.error("dryCrud error: you must provide a database object and type");
    	process.exit(e.code);

		return false;

	}

	//Constructor of crudbrella object being returned to the user
	var newCrud = function(){
		this.collection = config.collection;
		this.type = config.type;
	};

	//Include core functionality and utility methods
	_.extend(newCrud.prototype, utils);

	//If the type provided is a string
	if (typeof config.type == 'string' || config.type instanceof String){

		//attempt to load and use the module
		try {
  	 		
  	 		var adaptorModule = require(config.type);

		} catch(e) {
    		
    		console.error("Adaptor " + config.typre + " is not found");
    		process.exit(e.code);
	
		}

	//If the type provided is a module
	}else{
		
		adaptorModule = config.type;

	}

	//use the module
	_.extend(newCrud.prototype, adaptorModule);

	return new newCrud();

};

module.exports = DryCrud;
