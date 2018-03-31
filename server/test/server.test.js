const expect = require('expect')
const request = require('supertest')

const { app } = require('../server')
const { Todo } = require('../models/todo')

const todos = [
  { text: 'first' },
  { text: 'second' }
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