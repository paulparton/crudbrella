var _  = require('lodash');


module.exports = {

	//Default success callback (can be replaced at runtime)
	successCallback: function(res, result){
		
		console.log("result", result);

		if(!result) { return res.send(404, ""); }

		res.send(result);

	},

	//Default error callback (can be replaced at runtime)
	errorCallback: function(res, error){

		console.log("error: ", error);

		//res.send(500, error);

	},

	//Standard db callback
	dbCallback: function(data){

		//console.log(data);
		//console.log('in the callback', data);

		//If there is an error
		if(data.err && data.err !== null){
			
			console.log('this is an error...', data.err);

			//Use a user defined or default error callback
			return data.onError(data.res, data.err || "empty");

		}

		console.log(data.req.method);

		if(data.req.method == 'DELETE'){
			console.log("method is delete");
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
		app.delete(root + '/:id', this.delete());

	},
	utils: {

		depopulate: function (model, doc){
			
			console.log("depop");

			//loop through each item in the model
			_.each(model.schema.tree, function(item, key){

				var schemaDetails = JSON.stringify(item) || "";

				//If the item has a 'ref' property
				if (schemaDetails.indexOf('ref') !== -1){

					//For that item in the current document
					doc[key] = _.map(doc[key], function(value){

						//model.find({_id: value.id}, function(err, data){
							
							console.log("here, here, here", value._id);

							return value._id;

						//});

					});

				}

			});

		}

	}
};




