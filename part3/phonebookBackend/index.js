require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (request) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

// const requestLogger = (request,response,next) => {
//   console.log('Method',request.method)
//   console.log('Path',request.path)
//   console.log('Body',request.body)
//   console.log('----')
//   next()
// }

// app.use(requestLogger)

app.get('/',(request,response) => {
    response.send('<h1>Hello Manoj</h1>')
})

app.get('/api/persons',(request,response) => {
    Person.find({}).then(persons => response.json(persons))
})

app.get('/info',(request,response) => {
  response.send(`<p>phonebook has info for ${persons.length} people<p/> <br/> <p> ${new Date()} <p/>`)
})

app.get('/api/persons/:id',(request,response,next) => {
  const id = request.params.id
 Person.findById(id)
 .then(result => response.json(result))
 .catch(error => next(error))
 
  
})

app.delete('/api/persons/:id',(request,response) => {
  const id = request.params.id
  Person.findByIdAndDelete(id)
  .then(result => response.status(204).end())
})


app.post('/api/persons',(request,response,next) => {
  const name = request.body.name
  const number = request.body.number

  Person.create({
    name:name,
    number:number
  })
  .then(person => response.json(person))
  .catch(error => next(error))

})

app.put('/api/persons/:id',(request,response,next) => {
  const {name,number} = request.body
  Person.findById(request.params.id)
  .then(person => {
    if(!person){
      return response.status(404).end()
    }
    person.name = name
    person.number = number
    return person.save().then(updatedPerson => {
       response.json(updatedPerson)
    })
  })
  .catch(error => next(error))
})

const unknownEndpoint = (request,response) => {
  response.status(404).send({error:'unknown end point'})
}

app.use(unknownEndpoint)

const errorHandler = (error,request,response,next) => {
  console.error(error.message)
  if(error.name === 'CastError' ){
    return response.status(400).send({error:'malformatted id'})
  }else if(error.name === 'ValidationError'){
    return response.status(400).send({error:error.message})
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})