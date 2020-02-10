
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())

morgan.token('data', (req) => {
    return JSON.stringify(req.body)
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :data'))
app.use(cors())
let persons = [
  {
    name: "Arto Hellas",
    number: "000-00000",
    id: 1
  },
  {
    name: "Marto Hellas",
    number: "000-00000",
    id: 2
  },
  {
    name: "Barto Hellas",
    number: "000-00000",
    id: 3
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/info', (req, res) => {
    res.send(`<p>There is currently ${persons.length} persons numbers</p>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const generateId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.number || !body.name) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  if (persons.some(person => person.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique'
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})
const toimi
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})