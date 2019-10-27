const respondWithJSON = require("./respondWithJSON");
/**
 * Error message/code response
 */
module.exports = function(res, jsonErrorCode, errorMsg, httpErrorCode = 200) {
	if( errorMsg.stack && errorMsg.message ) {
		respondWithJSON(res, { 
			error: {
				code: jsonErrorCode,
				message: errorMsg.message,
				stack: errorMsg.stack
			}
		});
	} else {
		respondWithJSON(res, { 
			error: {
				code: jsonErrorCode,
				message: errorMsg
			}
		});
	}
	return;
}
