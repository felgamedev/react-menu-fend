const mongoose = require('mongoose')
const Schema = mongoose.Schema
const IngredientSchema = require('./ingredient')

const FoodComponentSchema = {
  name: String,
  ingredients: [{}]
}

module.exports = mongoose.model('FoodComponent', FoodComponentSchema)
