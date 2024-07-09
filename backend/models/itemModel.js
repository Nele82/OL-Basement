const mongoose = require('mongoose')
// Defining a Model in Mongoose is done through the Schema interface
const Schema = mongoose.Schema

const itemSchema = new Schema({
  itemTitle: {
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
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  storageId: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Item', itemSchema)