var _ = require('lodash'),
	utils = require("./lib/utils-prototype"),
	cbCore = require("./lib/crudbrella-prototype"),
	crudbrella;

crudbrella = function(config){
	
	//Check for required config
	if(!config.collection || !config.type){

		//Raise an error here...
		console.log("dryCrud error: you must provide a database object and type");

		return false;

	}

	//Constructor of crudbrella object being returned to the user
	var newCrud = function(){

		//Perhaps I should target this at only the this.db functions.
		for (sub in this) {
        	for (key in this[sub]) {
            	if (typeof this[sub][key] == 'function') {
                	this[sub][key] = this[sub][key].bind(this);
            	}
        	}
    	}

		this.collection = config.collection;
		this.type = config.type;

	};

	//newCrud.prototype = cbCore;
		
	//Include core functionality and universal utility methods
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
	
	
	newCrud.prototype.db = adaptorModule
	_.extend(newCrud.prototype, cbCore);

	return new newCrud();

};

module.exports = crudbrella;
