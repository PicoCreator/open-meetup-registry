// Base58 charset tester
const base58_regexTest = new RegExp("^[123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz]{22}$");

/**
 * Validates that the given GUID input - has enough "randomness"
 * 
 * @param {String} input
 * 
 * @return {String} valid base 58 GUID
 */
module.exports = function normalizeGUID(input) {
	// Length safety check
	if( input == null || input.length != 22 ) {
		throw "Invalid base 58 GUID string format (invalid length) : "+input;
	}

	// Lets test for base58 strictly
	if( !base58_regexTest.test(input) ) {
		throw "Invalid base 58 GUID string format (invalid charset) : "+input;
	}

	// Return the input
	return input;
}