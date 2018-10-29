const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const dbConfig = require('./dbconfig')

// Models
const Test = require('./app/models/test')

// Routers
const AllergenRouter = require('./app/routes/allergen')
const IngredientRouter = require('./app/routes/ingredient')
const UserRouter = require('./app/routes/user')

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
app.use(urlPrefix, IngredientRouter)
app.use(urlPrefix, UserRouter)

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
