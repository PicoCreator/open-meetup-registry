//
// This module setup the respective mongodb connection
// and returns it in a awaitable promise object
//
// As we do not need to close the connection, unless a server shutdown occurs,
// we do not need to implement any of the logic for it >_<
//

// Load the dependencies
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

// Load the DB config
const dbConfig = require( path.resolve( process.cwd(), "config/secure/mongodb" ) )

// Validate DB config
if( dbConfig.connection == null || dbConfig.connection.length <= 0 ) {
	console.error("[FATAL] Missing `config/secure/mongodb` config file");
	process.exit(1);
}

// Setup the dbClient
const dbClientInstance = new MongoClient(dbConfig.connection, { useNewUrlParser: true });

// Client connector wrapped in a promise
const dbClientConnectionPromise = (async function() {
	try {
		let connector = await dbClientInstance.connect();
		return connector.db( dbConfig.dbName || "meetup-registry" );
	} catch(e) {
		console.error("[FATAL] Unexpected db connector failure");
		console.error(e);
		process.exit(1);
	}
})();

// Return the module exports
module.exports = dbClientConnectionPromise;
