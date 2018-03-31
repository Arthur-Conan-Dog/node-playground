const express = require('express')
const bodyParser = require('body-parser')

const { ObjectID } = require('mongodb')

const { mongoose } = require('./db/mongoose')
const { Schema } = mongoose

const { Todo } = require('./models/todo')
const { User } = require('./models/user')

const app = express()

app.use(bodyParser.json())

app.post('/todos', (req, res) => {
  let todo = new Todo({
    ...req.body
  })

  todo.save().then(doc => res.send(doc), e => res.status(400).send(e))
})

app.get('/todos', (req, res) => {
  Todo.find({}).then(docs => res.send({ data: docs }), e => res.status(400).send(e))
})

app.get('/todos/:id', (req, res) => {
  const { id } = req.params

  if (!ObjectID.isValid(id)) {
    res.status(400).send()
  } else {
    Todo.find({ _id: id }).then(doc => {
      if (doc) {
        res.status(200).send(doc)
      } else {
        res.status(404).send()
      }
    }).catch(e => res.status(400).send(e))
  }
})

app.listen(3001, () => console.log('Start up on Port 3001...'))

module.exports = { app }