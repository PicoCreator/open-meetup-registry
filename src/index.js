// Setup express JS server
const express = require('express');
const app = express();
const port = 3000;

//
// Lets setup everything
//
(async function() {
	// Setup the JSON / URL Encoder handling
	app.use(express.json()) // for parsing application/json
	app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

	// Wait for monogodb to load
	await require("./db/mongodb");

	// Lets setup the various API's
	await require("./api/organiser/providerApi")(app);

	// Setup the listener
	app.listen(port, () => console.log(`Open Meetup Registry : ${port}!`))
})();
