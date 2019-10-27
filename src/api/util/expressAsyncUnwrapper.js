// Setup ERROR responder
const setupErrorResponse = require("./setupErrorResponse");

/**
 * Small utility library, which unwraps async functions, to promise functions
 * for used with the express.js library
 * 
 * @param {*} fn you wish to unwrap from async to promises
 */
const expressAsyncUnwrapper = fn => (req, res, next) => {
	Promise.resolve(fn(req, res, next))
		.catch(function(e) {
			// Unexpected error handler
			setupErrorResponse(res, "UNEXPECTED_ERROR", e);
			return;
		});
};
module.exports = expressAsyncUnwrapper;
