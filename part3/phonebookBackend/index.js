const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

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
    response.json(persons)
})

app.get('/info',(request,response) => {
  response.send(`<p>phonebook has info for ${persons.length} people<p/> <br/> <p> ${new Date()} <p/>`)
})

app.get('/api/persons/:id',(request,response) => {
  const id = request.params.id
  console.log(id)
  const person = persons.find(p => p.id === id)
  if(person){
    response.json(person)
  }else {
    response.statusMessage = 'the id is not found'
    response.status(404).end()
  }
  
})

app.delete('/api/persons/:id',(request,response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const generateId = () => {
  return String(Math.floor(Math.random() * 1000000))
}

app.post('/api/persons',(request,response) => {
  if(!request.body.name){
    return response.status(400).json({
      error:'name missing'
    })
  } 
  if(!request.body.number){
    return response.status(400).json({
      error:'number missing'
    })
  }
  const personExist = persons.some(p => p.name === request.body.name)
  if(personExist){
    return response.status(400).json({
      error:"name already exist"
    })
  }
  const person = {
    id:generateId(),
    name:request.body.name,
    number:request.body.number
  }

  persons = persons.concat(person)
  response.json(person)

})

const unknownEndpoint = (request,response) => {
  response.status(404).send({error:'unknown end point'})
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001

app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})