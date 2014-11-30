describe("the core crudbrella module", function(){

	beforeEach(function(){

		var express = require('express'),
			crudbrella = require('crudbrella'),
			mocks = require('./mockdata-prototype.js'),
			testCrud = crudbrella({
				collection: mocks.mockCollection,
				type: mocks.mockConnnector
			});

		//How do I mock a database for the basic general functionaltiy?
		//a mock-prototype module? then tests for that module?. yes.

	});

	describe('The instanciation process', function(){

		it('fails to initialize with out a database type and corresponding database resource', function(){

			var mean = crudbrella({});

			expect(mean).toBe(false);

		});

	});

	it('uses default callbacks if there are no user provided callbacks', function(){

		testCrud.read({query:{
			error:'',
			body: 'mockData1'
		}});

		//How do I execute the callback that would run when a route is hit?

	});

	it('uses user defined callbacks if they are provided', function(){

		testCrud.read(
			query:{
				error:'',
				body: 'mockData1'
			},
			onSuccess: function(res, body){

				expect(body).toBe('body');

			}
		});

		testCrud.read(
			query:{
				error:'error1',
				body: ''
			},
			onSuccess: function(res, error){

				expect(error).toBe('error1');

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