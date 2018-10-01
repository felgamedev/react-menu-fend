const mongoose = require('mongoose')
const Schema = mongoose.Schema

const AllergenSchema = new Schema({
  name: String
})

module.exports = mongoose.model('Allergen', AllergenSchema)
