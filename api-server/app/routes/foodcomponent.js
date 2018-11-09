const express = require('express')
const router = express.Router()
const FoodComponent = require('../models/foodcomponent')

const prefix = "/foodcomponent"

router.route(prefix + '/')
  // READ ALL
  .get((req, res) => {
    FoodComponent.find((err, foodcomponent) => {
      if(err) res.send(err)
      res.json(foodcomponent)
    })
  })
  // CREATE
  .post((req, res) => {
    var foodcomponent = new FoodComponent()
    foodcomponent.name = req.body.name
    foodcomponent.brandName = req.body.brandName
    foodcomponent.ingredients = req.body.ingredients

    foodcomponent.save((err) => {
      if(err) res.send(err)
      res.json(foodcomponent);
    })
  })

router.route(prefix + "/:id")
  // READ a single record
  .get((req, res) => {
    FoodComponent.find({_id: req.params.id}, (err, foodcomponent) =>{
      if(err) res.send(err)
      res.json(foodcomponent)
    })
  })
  // UPDATE a single record
  .put((req, res) => {
    console.log("Put request");
    FoodComponent.findById(req.params.id, (err, foodcomponent) => {
      if(err) res.send(err)
      /* TODO add properties here */
      foodcomponent.name = req.body.name ? req.body.name : foodcomponent.name
      foodcomponent.brandName = req.body.brandName ? req.body.brandName : foodcomponent.brandName
      foodcomponent.ingredients = req.body.ingredients ? req.body.ingredients : foodcomponent.ingredients

      foodcomponent.save((err, updatedObject) => {
        if(err) res.send(err)
        res.json(updatedObject)
      })
    })
  })
  // DELETE a single record
  .delete((req, res) => {
    FoodComponent.deleteOne({_id:req.params.id}, (err) => {
      if(err) res.send(err)
      res.json({message: "FoodComponent Deleted"})
    })
  })

module.exports =  router
