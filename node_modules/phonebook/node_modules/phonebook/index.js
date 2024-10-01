const express = require('express')
const app = express()

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

app.use(express.json())

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

app.get('/api/notes/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(note => note.id === id)

    if(request.params.number || request.params.name){
        response.status(404).end()
    }else{
        response.json(person)
    }
  })

app.delete('/api/notes/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.post('/api/notes', (request, response) => {
    const person = request.body
    console.log(person)
    response.json(person)
  }) 

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})