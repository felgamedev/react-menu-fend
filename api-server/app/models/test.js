const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TestSchema = new Schema({
  title: String,
  description: String
})

module.exports = mongoose.model('Test', TestSchema)
