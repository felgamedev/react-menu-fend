const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const dbConfig = require('./dbconfig')
const Test = require('./app/models/test')
const Allergen = require('./app/models/allergen')

// Define a port to listen on for local testing
const PORT = 8000

// Ensure the express app is able to read the calls to the api
app.use(bodyParser.urlencoded({extended: true }))
app.use(bodyParser.json())

// connect to the remote DB
mongoose.connect(dbConfig.dbUrl)

// Set up router and default url extender
const router = express.Router();
app.use('/api', router)

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

router.route('/allergens')
  .post((req, res) => {
    var allergen = new Allergen();
    allergen.name = req.body.name

    allergen.save((err) => {
      if(err) res.send(err)
      res.json({ message: "Added allergen" })
    })
  })
  .get((req, res) => {
    Allergen.find((err, allergens) => {
      if(err) res.send(err)
      res.json(allergens)
    })
  });
// Start up the API listener
app.listen(PORT, () => {
  console.log('Listening on port' + PORT);
})
