var _  = require('lodash');

/*********
* Methods for mongoose collections (move to separate file)
**********/
module.exports =  {

	//Create a new record
	create: function (config){

		return function(req, res, options){

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

			console.log("inside read");

			var toType = function(obj) {
			  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
			}

			//console.log(config, this, this.collection);

			//console.log("this is...", typeof(this.collection()), toType(this.collection()));

			//If no options are provided default to an empty object
			options = options || {};

			//Find using optional query or find all
			this.collection.find(options.query || {})

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

		}.bind(this)
	},

	//Update a record
	update: function(options){

		return function(req, res, options){

			//If no options are provided default to an empty object
			options = options || {};

			//If the id has been included in the body, remove it
			if(req.body._id) { delete req.body._id; }

			//Check if the body contains any populated fields and depopulate them
			this.utils.depopulate(this.collection, req.body);

			console.log('after depop');

			//Use dryCrud.read to find the document to be updated
			this.read({

				query: {_id: req.params.id},

				//custom success handler to complete update, use default for errors
				onSuccess: function(innerRes, result){

					console.log('inside onSuccess');

					var updated = _.extend(result[0], req.body);
					//var updated = result[0];
					
					//updated.sources = req.body.sources;

					console.log("WITAF", updated, req.body);

					updated.save(function (err, actualResult) {

						console.log("what came after: ", actualResult);

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

		return function(req, res, options){

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