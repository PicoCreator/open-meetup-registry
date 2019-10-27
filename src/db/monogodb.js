//
// This module setup the respective mongodb connection
// and returns it in a awaitable promise object
//

// Load the dependencies
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

// Load the DB config
const dbConfig = require( path.resolve( process.cwd(), "config/secure/mongodb" ) )

// Validate DB config
if( dbConfig.connection == null || dbConfig.connection.length <= 0 ) {
	throw "Missing `config/secure/mongodb` config file";
}

// Setup the dbClient
const dbClientInstance = new MongoClient(dbConfig.connection, { useNewUrlParser: true });

// Client connector wrapped in a promise
const dbClientConnectionPromise = (async function() {
	return await dbClientInstance.connect();
})();

// Return the module exports
module.exports = dbClientConnectionPromise;
