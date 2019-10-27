/**
 * Validate the string length, and returns it, else throws an error
 * 
 * @param {String} input to normalize
 * @param {String} paramName to show in errors
 * @param {int} minSize of input
 * @param {int} maxSize of output
 * @param {string} trailString to use and truncate input if provided, otherwise throws an error if maxSize is exceeded
 * 
 * @return {String} valid string
 */
module.exports = function normalizeLength(input, paramName = "parameter", minSize = 5, maxSize = 2048, trailString = null) {
	// Get input length
	input = (input || "");
	const length = input.length;

	// Length safety check
	if( minSize < 0 || length < minSize ) {
		throw `Invalid ${paramName} size, min=${minSize}, input.length=${length}`;
	}

	// Check and truncate according to max size
	if( maxSize < 0 || length > maxSize ) {
		if( trailString ) {
			return input.slice(0, maxSize - trailString.length)+trailString;
		}

		// Else throws it
		throw `Invalid ${paramName} size, max=${maxSize}, input.length=${length}`;
	}
	
	// Return the input
	return input;
}
