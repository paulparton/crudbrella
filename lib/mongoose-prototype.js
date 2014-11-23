var _  = require('lodash');

/*********
* Methods CRUD methods
**********/
module.exports =  {

	//Create a new record
	create: function (options){

		return function(req, res){

			//If no options are provided default to an empty object
			options = options || {};

			this.collection.create(req.body, function(err, result) {

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

			console.log("inside read.");

			//If no options are provided default to an empty object
			options = options || {};
			options.query = options.query || {};

			//Create a local copy of the query definition to be parsed
			var query = JSON.parse(JSON.stringify(options.query)) || {};

			//Loop through every object in query
			_.each(query, function(item, key){

				//If the value starts with a ^ use the item value as a key for req.params
				if(item[0] === "^"){
					query[key] = req.params[item.replace("^","")];
				}

			});

			//Find using optional query or find all
			this.collection.find(query || {})

				//Process options populate string / object or default to empty string
				.populate(options.populate || '')

				//Execute the query
				.exec(function(err, items){

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
			if(req.body._id) { delete req.body._id; }

			console.log("what now?", req.body);

			//Check if the body contains any populated fields and depopulate them
			this.utils.depopulate(this.collection, req.body);

			//Use crudbrella read to find the document to be updated
			this.read({

				query: {_id: req.params.id},

				//custom success handler to complete update, use default for errors
				onSuccess: function(innerRes, result){



					var updated = _.extend(result[0], req.body);

					console.log("inside read success", updated);

					updated.save(function (err, actualResult) {

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