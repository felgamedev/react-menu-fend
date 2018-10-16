const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const dbConfig = require('./dbconfig')

// Models
const Test = require('./app/models/test')
const Allergen = require('./app/models/allergen')
const Ingredient = require('./app/models/ingredient')
const FoodComponent = require('./app/models/foodcomponent')

// Routers
const AllergenRouter = require('./app/routes/allergen')

// Define a port to listen on for local testing
const PORT = 8000

// Ensure the express app is able to read the calls to the api
app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())

// Enable CORS
app.use(cors())

// connect to the remote DB
mongoose.connect(dbConfig.dbUrl)

// Set up router and default url extender
const urlPrefix = "/api/v1"
const router = express.Router();
app.use(urlPrefix, router)

// API endpoints
app.use(urlPrefix, AllergenRouter)

// Middleware for extra processing
router.use((req, res, next) => {

  console.log("Simulating some processing on " + req)
  next()
})

router.get('/', (req, res) => {
  res.json({ message: "Thanks for querying the test api!"})
})

router.route('/tests')
  .post((req, res) => {
    var test = new Test();
    test.title = req.body.title
    test.description = req.body.description

    test.save((err) => {
      if(err) res.send(err)
      res.json({ message: "Test successfully added "})
    })
  });

// Route for general Ingredient calls, get all and add new
router.route('/ingredient')
  .post((req, res) => {
    var ingredient = new Ingredient()
    ingredient.name = req.body.name
    ingredient.alternativeName = req.body.alternativeName
    ingredient.brandName = req.body.brandName
    ingredient.allergens = req.body.allergens

    ingredient.save((err) => {
      if(err) res.send(err)
      res.json({ message: "Ingredient added successfully!"})
    })

  })
  .get((req, res) => {
    Ingredient.find((err, ingredients) => {
      if(err) res.send(err)
      res.json(ingredients)
    })
  });

// Route for general FoodComponent calls, get all and add new
router.route('/foodcomponent')
  .post((req, res) => {
    var foodComponent = new FoodComponent()
    foodComponent.name = req.body.name
    foodComponent.ingredients = req.body.ingredients

    foodComponent.save((err) => {
      if(err) res.send(err)
      res.json({ message: "Food component added successfully"})
    })
  })
  .get((req, res) => {
    FoodComponent.find((err, foodComponents) => {
      if(err) res.send(err)
      res.json(foodComponents)
    })
  })

// Start up the API listener
app.listen(PORT, () => {
  console.log('Listening on port' + PORT);
})
