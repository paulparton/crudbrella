module.exports = {
	
	create: function(config){

		return function(req, res){

			config = config || {};

			options = this.parseOptions(config, req);

			return this.db.create(options, function(err, items){

				//Pass results and req/res to the dbCallback
				this.dbCallback({
					req: req, 
					res: res, 
					err: err, 
					result: items,
					onSuccess:options.onSuccess || this.successCallback,
					onError:options.onError || this.errorCallback
				});

			}.bind(this));

		}.bind(this);
		
	},
	read: function(config){

		return function(req, res){		

			config = config || {};

			options = this.parseOptions(config, req);

			return this.db.read(options, function(err, items){

				//Pass results and req/res to the dbCallback
				this.dbCallback({
					req: req, 
					res: res, 
					err: err, 
					result: items,
					onSuccess:options.onSuccess || this.successCallback,
					onError:options.onError || this.errorCallback
				});

			}.bind(this));

		}.bind(this);
		
	},
	update: function(config){

		return function(req, res){
			
			config = config || {};
			
			options = this.parseOptions(config, req);

			return this.db.update(options, function(err, items){

				//Pass results and req/res to the dbCallback
				this.dbCallback({
					req: req, 
					res: res, 
					err: err, 
					result: items,
					onSuccess:options.onSuccess || this.successCallback,
					onError:options.onError || this.errorCallback
				});

			}.bind(this));

		}.bind(this);
		
	},
	delete: function(config){

		return function(req, res){
			
			config = config || {};

			options = this.parseOptions(config, req);

			return this.db.delete(options, function(err, items){

				//Pass results and req/res to the dbCallback
				this.dbCallback({
					req: req, 
					res: res, 
					err: err, 
					result: items,
					onSuccess:options.onSuccess || this.successCallback,
					onError:options.onError || this.errorCallback
				});

			}.bind(this));

		}.bind(this);
		
	}			

}