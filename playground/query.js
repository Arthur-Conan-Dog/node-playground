const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo')

const { ObjectID } = require('mongodb')

// const id = new ObjectID('5abdf9cf4f9e01344044e238')
const id = '5abefa1c4048475b3d579884'

if (!ObjectID.isValid(id)) {
  console.error('Not valid id')
}

// Todo.find({ _id: id }).then(res => console.log(res))

// Todo.findOne({ _id: id }).then(res => console.log(res))

Todo.findById(id).then(res => console.log(res)).catch(e => console.error(e))

// Todo.remove({}).then(res => console.log(res))

// Todo.findOneAndRemove({}).then(doc => console.log(doc))

// Todo.findByIdAndRemove(id).then(doc => console.log(doc))