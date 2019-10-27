// Giant country code json
const isoJSON = require("iso-3166-2.json");

/**
 * Given input is an iso-3166-2 valid code
 * 
 * @param {String} input
 * 
 * @return {String} valid iso-3166-2 code
 */
module.exports = function normalizeCountryCode(input) {
	// Length safety check
	if( input == null || input.length < 4 || input.length > 6 ) {
		throw "Invalid iso-3166-2 country code (invalid length) : "+input;
	}

	// Lets split it
	input = input.toLocaleUpperCase();
	let splitCode = input.split("-");
	let baseCountry = splitCode[0];
	let subDivision = splitCode[1];

	// Lets check against the json
	if( isoJSON[baseCountry] ) {
		let countryDivisions = isoJSON[baseCountry].divisions;
		// Check subdivisions - and return
		if( countryDivisions[subDivision] ) {
			return input;
		}
	}

	// Error !
	throw "Invalid iso-3166-2 country code (no valid code) : "+input;
}