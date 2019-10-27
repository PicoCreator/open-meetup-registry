//
// Setup the provider collection
// and return it as a promise object
//
const groupCollectionPromise = (async function() {
	// Get the collection
	const dbConnector = await require("../mongodb");
	const collection = await dbConnector.collection("groups");

	// Lets setup indexes if needed
	// collection.createIndex( { "publicURL":1 } );

	// Alrighto time to return the collection object
	return collection;
})();
module.exports = groupCollectionPromise;
