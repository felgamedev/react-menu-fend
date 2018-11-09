const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FoodComponentSchema = {
  name: String,
  brandName: String,
  ingredients: []
}

module.exports = mongoose.model('FoodComponent', FoodComponentSchema)
