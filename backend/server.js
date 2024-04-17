const express = require('express') // Express.js library
const mongoose = require('mongoose') // Mongoose library
const userRoutes = require('./routes/users')
const userStorage = require('./routes/facilities')
require('dotenv').config() // .env library
const cors = require('cors')

// const allowedOrigins = [
//   'http://localhost:3000',
//   'http://localhost:3000/storage-list'
// ]

// const corsOptions = { 
//   origin: (origin, callback) => {
//     if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true)
//     } else {
//         callback(new Error('Not allowed by CORS'))
//     }
// },
// credentials: true, // Enable credentials (cookies, authorization headers, etc.)
// optionsSuccessStatus: 200 // HTTP status code for successful preflight requests
// // Allow requests from this origin
// }

// An instance of the Express application 
const app = express() // The App

// Middleware
app.use(express.json()) // Checks if a request comes with the body and attaches it to the 'req' object  

app.use(cors())

// Routes
app.use('/user', userRoutes)
app.use('/facilities', userStorage)

// Connecting to MongoDB - establishing a connection with the MongoDB server first and then listening to the PORT
mongoose.connect(process.env.MONGODB)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('Connected to the MongoDB collection / Listening to port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })