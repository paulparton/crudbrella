var _  = require('lodash');


module.exports = {
	parseOptions: function(options, req){

		var query,
			key,
			parsed = {};

		options = options || {};

		parsed = JSON.parse(JSON.stringify(options));

		//If no options are provided default to an empty object
		parsed.query = parsed.query || {};

		if(req.body){
			parsed.body = req.body;
		}

		//Loop through every object in query
		for (key in parsed.query){

			if(parsed.query.hasOwnProperty(key)){

				//If the value starts with a ^ use the item value as a key for req.params
				if(parsed.query[key][0] === "^"){
					parsed.query[key] = req.params[parsed.query[key].replace("^","")];
				}

				//If the value starts with a ~ use the item value as a key for req.query
				if(parsed.query[key][0] === "~"){
					parsed.query[key] = req.query[parsed.query[key].replace("~","")];
				}

			}

		};

		return parsed;

	},
	//Default success callback (can be replaced at runtime)
	successCallback: function(res, result){

		if(!result) { return res.send(404, ""); }

		res.send(result);

	},

	//Default error callback (can be replaced at runtime)
	errorCallback: function(res, error){

		res.send(500, error);

	},

	//Standard db callback
	dbCallback: function(data){

		//If there is an error
		if(data.err && data.err !== null){

			//Use a user defined or default error callback
			return data.onError(data.res, data.err || "empty");

		}

		if(data.req.method == 'DELETE'){
			data.result = true;
		}

		//Use a user defined or default success callback
		return data.onSuccess(data.res, data.result);

	},
	init: function(root, app){

		root = root.replace(/\/$/, "");

		app.get(root + '/', this.read());
		app.get(root + '/:id', this.read({query:{_id:'^id'}}));
		app.post(root + '/', this.create());
		app.put(root + '/:id', this.update());
		app.delete(root + '/:id', this.delete({query:{_id:'^id'}}));

	},
	utils: {
		//Depopulate populated mongoose documents (move this to the mongoose adaptor)
		depopulate: function (model, doc){

			//loop through each item in the model
			_.each(model.schema.tree, function(item, key){

				var schemaDetails = JSON.stringify(item) || "";

				//If the item has a 'ref' property
				if (schemaDetails.indexOf('ref') !== -1){

					//For that item in the current document
					doc[key] = _.map(doc[key], function(value){

						return value._id;

					});

				}

			});

		}

	}
};




