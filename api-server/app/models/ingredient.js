const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IngredientSchema = {
  name: String,
  brandName: String,
  allergens: [String]
}

module.exports = mongoose.model('Ingredient', IngredientSchema)
