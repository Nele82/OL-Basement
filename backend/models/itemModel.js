const mongoose = require('mongoose')

const Schema = mongoose.Schema

const itemSchema = new Schema({
  itemName: {
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