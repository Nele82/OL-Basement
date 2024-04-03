const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

// An instance of the Express application - the App
const app = express()

// Connecting to MongoDB - establishing a connection with the MongoDB server first and then listening to the PORT
mongoose.connect(process.env.MONGODB)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log('connected to db & listening on port', process.env.PORT)
    })
  })
  .catch((error) => {
    console.log(error)
  })