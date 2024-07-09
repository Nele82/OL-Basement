const mongoose = require('mongoose')
// Defining a Model in Mongoose is done through the Schema interface
const Schema = mongoose.Schema

const storageSchema = new Schema({
  facilityName: {
    type: String,
    required: true
  },
  length: {
    type: Number,
    required: true
  },
  width: {
    type: Number,
    required: true
  },
  height: {
    type: Number,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Facility', storageSchema)