//
// Setup the provider collection
// and return it as a promise object
//
const providersCollectionPromise = (async function() {
	// Get the collection
	const dbConnector = await require("../mongodb");
	const collection = await dbConnector.collection("providers");

	// Lets setup indexes if needed
	// collection.createIndex( { "publicURL":1 } );

	// Alrighto time to return the collection object
	return collection;
})();

module.exports = providersCollectionPromise;