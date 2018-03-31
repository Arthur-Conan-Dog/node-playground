const expect = require('expect')
const request = require('supertest')

const { ObjectID } = require('mongodb')

const { app } = require('../server')
const { Todo } = require('../models/todo')

const todos = [
  {
    _id: new ObjectID(),
    text: 'first'
  },
  { 
    _id: new ObjectID(),
    text: 'second'
  }
]

beforeEach(done => {
  Todo.remove({}).then(() => Todo.insertMany(todos)).then(() => done())
})

describe('POST /todos', () => {
  it('should create a new todo', done => {
    const text = 'Test todo text'

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect(res => expect(res.body.text).toBe(text))
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find({ text }).then(docs => {
          expect(docs.length).toBe(1)
          expect(docs[0].text).toBe(text)
          done()
        }).catch(e => done(e))
      })
  })

  it('should not create todo with invalid body data', done => {

    const text = ''

    request(app)
      .post('/todos')
      .send({ text })
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err)
        }

        Todo.find().then(docs => {
          expect(docs.length).toBe(2)
          done()
        }).catch(e => done(e))
      })
  })
})

describe('GET /todos', () => {
  it('should get all todos', done => {

    request(app)
      .get('/todos')
      .expect(200)
      .expect(res => {
        expect(res.body.data.length).toBe(2)
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should return todo doc which id is equal to id in the params', done => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => expect(res.body.text).toBe(todos[0].text))
      .end(done)
  })

  it('should return 404 if todo not found', done => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done)
  })

  it('should return 400 if id is not valid', done => {
    request(app)
      .get('/todos/2333')
      .expect(400)
      .end(done)
  })
})