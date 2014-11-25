#CRUDbrella

## 1.What is CRUDbrella?
CRUDbrella is a nodeJS module for creating DRY Express CRUD apps.

###How does it do that?
By generating a set of basic CRUD methods providing and a route generator that adds CRUD enpoints in a single line of code.

###What databases are current supported?
MongoDB using either Mongoose or the native MongoDB driver.

###What databases will be supported
I am currently working on support for PostgreSQL and MYSQL. I will continue to add more databases and will happily take requests.

##2. Examples
I will provide a set of examples for each database module. Each set of examples will cover:
1. Generating a set of CRUD enpoints with the init() generator
2. Manually pointing express routes to basic CRUDbrella methods
3. Configuring CRUDbrella methods

###2.1 Mongoose Examples
Examples using the mongoose module
####2.1.1 Mongoose endpoint generator
    //a mongoose collection
    var mongooseCollection,
        //express app or router
	    app,
	    //crudbrella
	    crudbrella = require('crudbrella');
        
        //open a crudbrella
	    myCrud = crudbrella({
		    type:'mongoose',
		    collection: mongooseCollection
	    });
        
        //generate crud endpoints, this will create the same set of methods outlined in the next examples
	    crudbrella.init('routePrefix', app);

####2.1.2 Manually pointing to mongoose crudbrella routes
    //a mongoose collection
    var mongooseCollection,
        //express app or router
	    app,
	    //crudbrella
	    crudbrella = require('crudbrella');
        
        //open a crudbrella
        myCrud = crudbrella({
		    type:'mongoose',
		    collection: mongooseCollection
	    });
        
        //Create
        app.post('/', myCrud.create());
        //Read all
	    app.get('/', myCrud.read());
	    //Read one by id
	    app.get('/:id', myCrud.read({query:{_id:'^id'}}));
	    //Update
	    app.put('/', myCrud.update());
	    //Delete
	    app.delete('/:id', myCrud.delete());

	    //query:{_id:'^id'}} is explained in the next example

####2.1.3 Configuring CRUDbrella methods
Configuraiton of methods is currently limited, future configuration options are actively being investigated. As with all aspects of crudbrella, requests are welcome.

All methods accept a single object with named parameters.

##### .read()
Calling .read() with no query will get all records, a query can be passed as JSON. To use a url parameter in a query pass the parameter name as a string, prefexed by ^
    
    //pass a {id: app.params.id} query
	myCrud.read({
		query: {_id:'^id'}
	});

#####all methods

######callbacks
custom success and error callbacks can be passed into crudbrella methods

	myCrud.read({
		onSuccess: function(expressResponse, queryResult){

			res.json(200, queryResult);

		},
		onError: function(expressResponse, queryResult){
			...
		}
	});


