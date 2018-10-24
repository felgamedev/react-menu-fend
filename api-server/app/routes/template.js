// Copcy this template then use find and replace to switch 'NewItemClass' and 'newItemName'

const express = require('express')
const router = express.Router()
const NewItemClass = require('../models/newItemName')

const prefix = "/newItemName"

router.route(prefix + '/')
  // READ ALL
  .get((req, res) => {
    NewItemClass.find((err, newItemName) => {
      if(err) res.send(err)
      res.json(newItemName)
    })
  })
  // CREATE
  .post((req, res) => {
    var newItemName = new NewItemClass()
    /* TODO add properties here */
    newItemName.property = req.body.property

    newItemName.save((err) => {
      if(err) res.send(err)
      res.json({ "message": "Added newItemName" });
    })
  })

router.route(prefix + "/:id")
  // READ a single record
  .get((req, res) => {
    NewItemClass.find({_id: req.params.id}, (err, newItemName) =>{
      if(err) res.send(err)
      res.json(newItemName)
    })
  })
  // UPDATE a single record
  .put((req, res) => {
    console.log("Put request");
    NewItemClass.findById(req.params.id, (err, newItemName) => {
      if(err) res.send(err)
      /* TODO add properties here */
      newItemName.property = req.body.property ? req.body.property : newItemName.property

      newItemName.save((err, updatedObject) => {
        if(err) res.send(err)
        res.json(updatedObject)
      })
    })
  })
  // DELETE a single record
  .delete((req, res) => {
    NewItemClass.deleteOne({_id:req.params.id}, (err) => {
      if(err) res.send(err)
      res.json({message: "NewItemClass Deleted"})
    })
  })

module.exports =  router
