// Copcy this template then use find and replace to switch 'User' and 'user'

const express = require('express')
const router = express.Router()
const User = require('../models/user')

const prefix = "/user"

router.route(prefix + '/')
  // // READ ALL
  // .get((req, res) => {
  //   User.find((err, user) => {
  //     if(err) res.send(err)
  //     res.json(user)
  //   })
  // })
  // CREATE
  .post((req, res) => {
    var user = new User()
    /* TODO add properties here */
    user.googleId = req.body.googleId
    user.firstName = req.body.firstName
    user.lastName = req.body.lastName
    user.userSince = Date.now()
    user.lastLogin = Date.now()

    console.log("User created");
    user.save((err) => {
      if(err) res.send(err)
      res.json(user)
    })
  })

router.route(prefix + "/:id")
  // READ a single record
  .get((req, res) => {
    User.findOne({googleId: req.params.id}, (err, user) =>{
      console.log("Looking for user: " + req.params.id)
      if(err) res.json({ userExists: false })
      console.log("User found");
      res.json(user)
    })
  })
  // UPDATE a single record
  .put((req, res) => {
    console.log("Put request");
    User.findById(req.params.id, (err, user) => {
      if(err) res.send(err)
      /* TODO add properties here */
      user.property = req.body.property ? req.body.property : user.property

      user.save((err, updatedObject) => {
        if(err) res.send(err)
        res.json(updatedObject)
      })
    })
  })
  // DELETE a single record
  .delete((req, res) => {
    User.deleteOne({_id:req.params.id}, (err) => {
      if(err) res.send(err)
      res.json({message: "User Deleted"})
    })
  })

module.exports =  router
