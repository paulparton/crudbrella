//Should I mock express functionality?

var res,
	returnResponse,
	parseParams;

returnResponse = function(){
	return [].slice.call(arguments);
};

//Build res.params
parseParams = function(route, url){

	//Get the keys from the route definition

	//get the values from the url

	//return an object made up of the above keys and values

}

res = {
	send: returnResponse,
	json: returnResponse
}

module.exports = {
	get: function(routeName, callback){

		return function(url){

			var req = {
				//params: parseParams(routeName, url);
			}

			return callback(req, res);

		};

	}
};