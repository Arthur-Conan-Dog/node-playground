const express = require('express')
const bodyParser = require('body-parser')

const { mongoose } = require('./db/mongoose')
const { Schema } = mongoose

const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  console.log(req.body)
  let todo = new Todo({
    ...req.body
  })

  todo.save().then(doc => res.send(doc), e => res.status(400).send(e))
})

app.listen(3001, () => console.log('Start up on Port 3001...'))

module.exports = { app }