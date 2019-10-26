// Setup express JS server
const express = require('express')
const app = express()
const port = 3000




// Setup the listener
app.listen(port, () => console.log(`Open Meetup Registry : ${port}!`))
