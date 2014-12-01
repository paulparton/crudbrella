describe("the core crudbrella module", function(){

	var crudbrella;

	beforeEach(function(){

		crudbrella = require('../index');
		mocks = require('./mockdata-prototype.js');
		mockRouter = require('./mockRouter.js');
		testCrud = crudbrella({
			collection: mocks.mockCollection,
			type: mocks.mockAdaptor
		});

	});

	describe('The instanciation process', function(){

		it('fails to initialize with out a database type and corresponding database resource', function(){

			var mean = crudbrella({});

			expect(mean).toBe(false);

		});


	});

	it('uses default callbacks if there are no user provided callbacks', function(){

		var mockGet = mockRouter.get('/:status', testCrud.read());

		expect(mockGet('/success')).toBe('success');
		expect(mockGet('/success')).toBe('error');

		//How do I execute the callback that would run when a route is hit?

	});

	it('uses user defined callbacks if they are provided', function(){

		testCrud.read({
			onSuccess: function(res, body){

				expect(body).toBe('body');

			}
		});


		//How do I execute the callback that would run when a route is hit?

	});

	describe("the crud route generator - .init()", function(){

		it('generates a set of create, read, update and delete routes', function(){

		});

		it('removes trailing forward slashes from the root prefix', function(){

		});

	});
});