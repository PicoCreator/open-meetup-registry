const respondWithJSON = require("./respondWithJSON");
/**
 * Error message/code response
 */
module.exports = function(res, jsonErrorCode, errorMsg, httpErrorCode = 200) {
	respondWithJSON(res, { 
		error: {
			code: jsonErrorCode,
			message: errorMsg
		}
	});
	return;
}
