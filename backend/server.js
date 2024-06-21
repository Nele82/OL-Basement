const express = require('express') // Express.js library
const mongoose = require('mongoose') // Mongoose library
const userRoutes = require('./routes/users')
const userStorage = require('./routes/facilities')
const userItems = require('./routes/items')
require('dotenv').config() // .env library
const cors = require('cors')

// An instance of the Express application 
const app = express() // The App

// Middleware
app.use(express.json()) // Checks if a request comes with the body and attaches it to the 'req' object  

app.use(cors())

// Routes
app.use('/user', userRoutes)
app.use('/facilities', userStorage)
app.use('/items', userItems)

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