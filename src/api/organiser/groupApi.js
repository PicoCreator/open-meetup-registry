//----------------------------------------------
//
// Dependencies
//
//----------------------------------------------

const expressAsyncUnwrapper = require("../util/expressAsyncUnwrapper");
const unwrapSignedRequest_noValidation = require("../util/unwrapSignedRequest_noValidation");
const setupErrorResponse = require("../util/setupErrorResponse");
const respondWithJSON = require("../util/respondWithJSON");

const providerCollectionPromise = require("../../db/collection/providerCollection");
const groupCollectionPromise = require("../../db/collection/groupCollection");
const normalizeGroupObj = require("../../db/normalize/normalizeGroupObj");

//----------------------------------------------
//
// The API setup and module export
//
//----------------------------------------------

/**
 * Setup the group API's
 * @param {*} app express server to setup 
 */
async function providerApiSetup(app) {

	//
	// Geting the group collection
	//
	const providerCollection = await providerCollectionPromise;
	const groupCollection = await groupCollectionPromise;

	//
	// Various API handlers
	//

	/**
	 * Group get API
	 */
	const getGroupHandler = expressAsyncUnwrapper( async function(req,res,next) {
		// Lets get the providerobj
		let groupObj = await groupCollection.findOne({ _id:req.params.groupID });

		// Lets return missing ID
		if( providerObj == null ) {
			setupErrorResponse(res, "NOT_REGISTERED", "No object found with the GUID");
			return;
		}

		// Normalize and return the result
		respondWithJSON(res, { result: normalizeGroupObj(providerObj) });
		return;
	});
	app.get( "/v1/organiser/group/:groupID/get", getGroupHandler );

	/**
	 * Group create API
	 */
	const createGroupHandler = expressAsyncUnwrapper( async function(req,res,next) {
		// Get the request parameter
		// and normalize it
		let groupObj = normalizeGroupObj(
			unwrapSignedRequest_noValidation(req),
			req.params.groupID
		);
		
		// Lets put it in - and return valid
		try {
			await groupCollection.insertOne(groupObj);
			respondWithJSON(res, { result: true });
			return;
		} catch(e) {
			// E11000 - duplicate key error
			if( (e+"").indexOf("E11000") >= 0 ) {
				setupErrorResponse(res, "DUPLICATE_ID", "Duplicate providerID found");
				return;
			}

			// Unexpected error
			setupErrorResponse(res, "UNEXPECTED_ERROR", e);
			return;
		}
	});
	app.put( "/v1/organiser/group/:groupID/create", createGroupHandler );
	app.post("/v1/organiser/group/:groupID/create", createGroupHandler );


	// /**
	//  * Update the provider information
	//  */
	// const updateProviderHandler = expressAsyncUnwrapper( async function(req,res,next) {
	// 	// Get the request parameter
	// 	// and normalize it
	// 	let updateObj = normalizeProviderObj(
	// 		unwrapSignedRequest_noValidation(req),
	// 		req.params.providerID
	// 	);

	// 	// Lets get the providerobj
	// 	let existingObj = await providerCollection.findOne({ _id:req.params.providerID });

	// 	// Lets return missing ID
	// 	if( existingObj == null ) {
	// 		setupErrorResponse(res, "NOT_REGISTERED", "No object found with the GUID");
	// 		return;
	// 	}

	// 	// Lets join the two
	// 	updateObj = normalizeProviderObj( Object.assign({}, existingObj, updateObj) );

	// 	// Lets perform the update
	// 	await providerCollection.updateOne({ _id:req.params.providerID }, { $set:updateObj });
	// 	respondWithJSON(res, { result: true });
	// 	return;
	// });
	// app.put( "/v1/organiser/provider/:providerID/update", updateProviderHandler );
	// app.post("/v1/organiser/provider/:providerID/update", updateProviderHandler );

	//
	// Return app
	//
	return app;
}
module.exports = providerApiSetup;