const mongoose = require('mongoose')

const { Schema } = mongoose

const TodoSchema = new Schema({
  text: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
})

const Todo = mongoose.model('Todo', TodoSchema)

module.exports = { Todo }