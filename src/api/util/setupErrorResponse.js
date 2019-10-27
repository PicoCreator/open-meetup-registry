/**
 * Error message/code response
 */
module.exports = function(res, code, msg) {
	res.error = {
		code: code,
		message: msg
	};
	return res;
}