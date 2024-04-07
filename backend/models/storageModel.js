const mongoose = require('mongoose')

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
  userId: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Facility', storageSchema)