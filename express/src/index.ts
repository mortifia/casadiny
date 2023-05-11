//dotenv as import
import dotenv from 'dotenv'
dotenv.config()

//express
import express from 'express'
const app = express()
app.use(express.json())

//express-session
// import session from 'express-session'
// app.use(
//   session({
//     resave: false,
//     saveUninitialized: true,
//     secret: process.env.SESSION_SECRET,
//   })
// )

// add auth routes router to express
import router from './auth.js'
app.use('/auth', router)

// add swagger-ui-express
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Casadiny API',
      version: '1.0.0',
      description: 'API for Casadiny',
    },
    // to automatically generate swagger docs from routes (need comment in routes)
  },
  apis: ['./*.js'],
}
const swaggerDocument = swaggerJsdoc(options)
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

//error handler
import { errorHandler } from './_errorHandler.js'
app.use(errorHandler)

// start express server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
