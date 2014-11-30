#CRUDbrella
CRUDbrella is a nodeJS module for creating DRY Express CRUD apps.
###What exactly does it do?
Crudbrella provides a set of basic CRUD methods and a route generator that adds CRUD enpoints in a single line of code.

##Installation
After installing nodeJS and your database of choice install crudbrella via npm

    npm install crudbrella

Then install the crudbrella adaptor for your database

    npm install adaptor-crudbrealla-[adaptor type]

###What databases are currently supported?
MongoDB using either Mongoose or the native MongoDB driver.

    //Install the mongoose adaptor
    npm install adaptor-crudbrella-mongoose
    
    //Install the native mongo adaptor
    npm install adaptor-crudbrella-mongo

###What other databases will be supported?
I am currently working on support for PostgreSQL and MYSQL. I will continue to add more databases and will happily take requests.

##Overview and examples
The following are general examples of crudbrella useage, for usage details about a specific adaptor read that adaptors readme.

###Adaptors

*   <a href="https://github.com/paulparton/adaptor-crudbrella-mongo" target="_blank">native mongodb adaptor</a>
*   <a href="https://github.com/paulparton/adaptor-crudbrella-mongoose" target="_blank">mongoose adaptor</a>


###Get started
Create a new crudbrella instance by passing the adaptor and a database connection to the crudbrella module

    //crudbrella
    var crudbrella = require('crudbrella');
        //A database connection
        mongooseCollection = ...,
        //A crudbrella adaptor
        crudbrellaAdaptor = require("adaptor-crudbrella-mongoose"),
        //express app or router
	    app;
	    
        //open a crudbrella!
	    myCrud = crudbrella({
		    type: crudbrellaAdaptor,
		    collection: mongooseCollection
	    });
####Generate a set of standard endpoints (create, read, read/:id, update/:id, delete)

        //generate crud endpoints, this will create the same set of methods created manually in the next examples
	    crudbrella.init('routePrefix', app);

####Manually create crudbrella routes
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

####Configuring CRUDbrella methods
Configuraiton of methods is currently limited, future configuration options are actively being investigated. As with all aspects of crudbrella, requests are welcome.

All methods accept a single object with named parameters.

##### query
Calling .read() with no query will get all records, a query can be passed as JSON. To use a url parameter in a query pass the parameter name as a string, prefexed by ^
    
    //pass a {id: app.params.id} query
	myCrud.read({
		query: {_id:'^id'}
	});

#####callbacks
custom success and error callbacks can be passed into crudbrella methods. 

	myCrud.read({
		onSuccess: function(expressResponse, queryResult){

			res.json(200, queryResult);

		},
		onError: function(expressResponse, queryResult){
			...
		}
	});





