/**
 * Output an express js response with the appropriate JSON formatting
 * 
 * @param {*}   res         express js response object
 * @param {*}   jsonObj     json object for respond
 * @param {Int} httpCode    HTTP status code to use
 */
module.exports = function respondWithJSON(res, jsonObj, httpCode = 200) {
	res.setHeader('Content-Type', "application/json; charset=utf-8");
	res.setHeader('Cache-Control', "no-cache");
	res.status(httpCode);
	res.json(jsonObj);
	// res.end(JSON.stringify(jsonObj));
}
