//----------------------------------------------
//
// Dependencies
//
//----------------------------------------------

const expressAsyncUnwrapper = require("../util/expressAsyncUnwrapper");
const providerCollectionPromise = require("../../db/collection/providerCollection");
const normalizeProviderObj = require("../../db/normalize/normalizeProviderObj");
const unwrapSignedRequest_noValidation = require("../util/unwrapSignedRequest_noValidation");
const setupErrorResponse = require("../util/setupErrorResponse");

//----------------------------------------------
//
// The API setup and module export
//
//----------------------------------------------

/**
 * Setup the provider API's
 * @param {*} app express server to setup 
 */
async function providerApiSetup(app) {

	//
	// Geting the provider collection
	//
	const providerCollection = await providerCollectionPromise;

	//
	// Various API handlers
	//

	/**
	 * Provider get API
	 */
	const getProviderHandler = expressAsyncUnwrapper( async function(req,res,next) {
		// Lets get the providerobj
		let providerObj = await providerCollection.findOne({ _id:req.params.providerID });

		// Lets return missing ID
		if( providerObj == null ) {
			return setupErrorResponse(res, "NOT_REGISTERED", "No object found with the GUID");
		}

		// Normalize and return the result
		res.result = normalizeProviderObj(providerObj);
		return res;
	});
	app.get("/v1/organiser/provider/:providerID/get", getProviderHandler );

	/**
	 * Provider create API
	 */
	const createProviderHandler = expressAsyncUnwrapper( async function(req,res,next) {
		// Get the request parameter
		// and normalize it
		let providerObj = normalizeProviderObj(
			unwrapSignedRequest_noValidation(req),
			req.params.providerID
		);
		
		// Lets put it in
		try {
			await providerCollection.insertOne(providerObj);
			res.result = true;
			return res;
		} catch(e) {
			// E11000 - duplicate key error
			if( (e+"").indexOf("E11000") >= 0 ) {
				return setupErrorResponse(res, "DUPLICATE_ID", "Duplicate providerID found");
			}

			// Unexpected error
			return setupErrorResponse(res, "UNEXPECTED_ERROR", e);
		}
	});
	app.put("/v1/organiser/provider/:providerID/create", createProviderHandler );
	app.post("/v1/organiser/provider/:providerID/create", createProviderHandler );


	//
	// Return app
	//
	return app;
}
module.exports = providerApiSetup;