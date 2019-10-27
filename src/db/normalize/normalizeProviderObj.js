//
// Dependencies
//
const normalizeGUID = require("./normalizeGUID");
const normalizeLength = require("./normalizeLength");

/**
 * @param {Object} input object for provider to filter
 * @param {String} oid for the object to use
 */
function providerObjectFilter( input, oid = null ) {
	let out = {};

	out._id  = normalizeGUID( oid || input.providerID || input._id );
	out.name = normalizeLength( input.name, "name", 5, 100, "..." );
	out.publicURL = normalizeLength( input.publicURL, "publicURL", 0, 2048 );
	out.publicKey = normalizeLength( input.publicKey, "publicKey", 64, 1024 );

	return out;
};
