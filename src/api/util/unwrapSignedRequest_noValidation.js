/**
 * Unwraps a signed request, without validation
 */
module.exports = function(req) {
	let ret = req.request;
	if( ret == null ) {
		throw "Signing Validation - Missing .request object";
	}
	return ret;
}