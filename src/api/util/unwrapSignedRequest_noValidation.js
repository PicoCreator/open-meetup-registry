/**
 * Unwraps a signed request, without validation
 */
module.exports = function(req) {
	let ret = req.body.request;
	if( ret == null ) {
		throw "Signing Validation Failed - Missing .request object";
	}
	return ret;
}
