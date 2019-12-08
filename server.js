const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// require route files
const questionRoutes = require('./app/routes/question_routes')

// require middleware
const errorhandler = require('errorhandler')
const requestLogger = require('./lib/request_logger')

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 4567
const clientDevPort = 7654

// instantiate express application object
const app = express()

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
app.use(cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}` }))

// define port for API to run on
const port = process.env.PORT || serverDevPort

// add `bodyParser` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(bodyParser.json())
// this parses requests sent by `$.ajax`, which use a different content type
app.use(bodyParser.urlencoded({ extended: true }))

// log each request as it comes in for debugging
app.use(requestLogger)

// register route files
app.use(questionRoutes)

// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
if (process.env.NODE_ENV === 'development') {
  app.use(errorhandler)
}

// run API on designated port (4567 in this case)
app.listen(port, () => {
  console.log('listening on port ' + port)
})

// needed for testing
module.exports = app
