var _  = require('lodash');

/*********
* Mock CRUD methods
**********/
exports.mockCollection = {
	mockQuery: function(request, callback){

		//return success or fail based on input
		return callback(request.body, request.error);

	}
},

exports.mockConnector =  {

	//Create a new record
	create: function (options){

		return function(req, res){

			//If no options are provided default to an empty object
			options = options || {};

			this.collection.mockQuery(req.body, function(err, result) {

				//Pass results and req/res to the dbCallback
				this.dbCallback({
					req: req, 
					res: res, 
					err: err, 
					result: result,
					onSuccess:options.onSuccess || this.successCallback,
					onError:options.onError || this.errorCallback
				});

			}.bind(this));

		}.bind(this);

	},

	//Read an existing record / records
	read: function(options){

		return function (req, res){


			//If no options are provided default to an empty object
			options = options || {};
			options.query = options.query || {};

			//this.utils.parseQuery;

			//Find using optional query or find all
			this.collection.mockQuery(query || {}, function(err, items){

					if(items.length === 1){
						items = items[0];
					}

					//Pass results and req/res to the dbCallback
					this.dbCallback({
						req: req, 
						res: res, 
						err: err, 
						result: items,
						onSuccess:options.onSuccess || this.successCallback,
						onError:options.onError || this.errorCallback
					});

				}.bind(this)

			);

		}.bind(this);
	},

	//Update a record
	update: function(options){

		return function(req, res){

			//If no options are provided default to an empty object
			options = options || {};

			//If the id has been included in the body, remove it
			var x = req.body._id; 
			delete req.body._id;

			console.log("what now?", req.body, x);

			//Check if the body contains any populated fields and depopulate them
			this.utils.depopulate(this.collection, req.body);

			//Use crudbrella read to find the document to be updated
			this.read({

				query: {_id: x},

				//custom success handler to complete update, use default for errors
				onSuccess: function(innerRes, result){

					var updated = _.extend(result, req.body);
					
					updated.save(function (err, actualResult) {

						console.log("so, this is saved here?...", actualResult);

						//Pass results and req/res to the dbCallback
						this.dbCallback({
							req: req, 
							res: res, 
							err: err, 
							result: actualResult,
							onSuccess:options.onSuccess || this.successCallback,
							onError:options.onError || this.errorCallback
						});

					}.bind(this));
					
				}.bind(this)

			})(req, res);

		}.bind(this);

	},

	//Delete a record
	delete: function(options){

		return function(req, res){

			//If no options are provided default to an empty object
			options = options || {};

			//If the id has been included in the body, remove it
			if(req.body._id) { delete req.body._id; }

			//Check if the body contains any populated fields and depopulate them
			this.utils.depopulate(this.collection, req.body);

			//Use dryCrud.read to find the document to be deleted
			this.collection.findOneAndRemove({_id: req.params.id}, function(err, result){

				//Pass results and req/res to the dbCallback
				this.dbCallback({
					req: req, 
					res: res, 
					err: err, 
					result: "",
					onSuccess:options.onSuccess || this.successCallback,
					onError:options.onError || this.errorCallback
				});

			}.bind(this));

		}.bind(this);

	}

};