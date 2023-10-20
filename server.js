const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient
const connectionString = 'INSERT CONNECTION STRING HERE'

MongoClient.connect(connectionString)
  .then(client => {
    console.log('Connected to Database')

    const db = client.db('star-wars-quotes')
    const quotesCollection = db.collection('quotes')

    app.set('view engine', 'ejs')
    app.use(bodyParser.urlencoded({ extended: true }))

    app.get('/', (req, res) => {
      quotesCollection.find().toArray()
        .then(results => {
          console.log(results)
        })
        .catch(error => console.error(error))
      res.sendFile(__dirname + '/index.html')
    })
    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          console.log(result)
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })
    app.listen(3000, function () {
      console.log('listening on server 3000')
    })
  })
  .catch(error => console.error(error))



