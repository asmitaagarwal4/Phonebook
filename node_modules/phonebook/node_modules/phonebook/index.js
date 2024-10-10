const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


let persons = 
    [
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

app.use(cors())
app.use(express.json())

morgan.token('body', (req) => {
  return req.body ? JSON.stringify(req.body) : 'no body';
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));
//revise what is goin on here


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info',(request,response)=>{
    const info = `<p>PhoneBook has info for ${persons.length} people</p>
    <p>${new Date()}</p>`
    response.send(info)
})


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).json("not found").end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)

    response.status(204).end() 
})

app.post('/api/persons', (request, response) => {
    const person = request.body
    person.id=Math.round(Math.random()*100)
    if (!person.name || !person.number) {
      return response.status(400).json({ error: 'name or number is missing' });
    }
    const existingEntry = persons.find(entry => entry.name === person.name);
    if (existingEntry) {
        return response.status(400).json({ error: 'name must be unique' });
    }
    persons = persons.concat(person)
    console.log(person)
    response.json(person)
  }) 

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})