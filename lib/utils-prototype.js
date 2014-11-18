module.exports = {

	//Default success callback (can be replaced at runtime)
	successCallback: function(res, result){
		
		//console.log("winrar?", result);
		if(!result) { return res.send(404, "poop"); }

		res.json(200, result);

	},

	//Default error callback (can be replaced at runtime)
	errorCallback: function(res, error){

		console.log("error: ", error);

		res.send(500, error);

	},

	//Standard db callback
	dbCallback: function(data){

		//console.log(data);
		//console.log('in the callback', data);

		//If there is an error
		if(data.err){

			//Use a user defined or default error callback
			return data.onError(data.res, data.err || "empty") || this.errorCallback(data.res, data.err || "empty");

		}

		//Use a user defined or default success callback
		return data.onSuccess(data.res, data.result) || this.successCallback(data.res, data.result);

	},
	utils: {

		depopulate: function (model, doc){
		
			_.each(model.schema.tree, function(item, key){

				var schemaDetails = JSON.stringify(item) || "";

				if (schemaDetails.indexOf('ref') !== -1){
					
					doc[key] = _.map(doc[key], function(value){

						return value._id;

					});

				}

			});

		}

	}
};