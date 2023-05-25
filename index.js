
const app = require('./app') // actual express application
const config = require('./utils/config')
const logger = require('./utils/logger')

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})


// imports actual application from app.js file and then starts the application
// advantages of separating express app and the code that takes care of the web server:
// application can now be tested at the level of HTTP API calls without actually making calls wie HTTP over the network