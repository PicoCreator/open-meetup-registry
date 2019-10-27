/**
 * Unwraps a signed request, without validation
 */
module.exports = function(req) {
	return req.request;
}