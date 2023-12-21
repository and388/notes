const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

let notes = [
      { 
        id: 1,
        content: "HTML is easy",
     important: true  },
       {
        id: 2,
        content: "Browser can execute only JavaScript",   
     important: false  }, 
      {
        id: 3,
        content: "GET and POST are the most important methods of HTTP protocol", 
       important: true  }
    ]

    const genId = () => {
      const maxId = notes.length > 0 ?
      Math.max( ...notes.map( n => n.id)) :
      0
       return maxId + 1
    }

    app.get('/api/notes', (request, response ) => {
        response.json(notes)
    })

    app.get('/api/notes/:id', (request, response) => {
       const id = Number(request.params.id)
       const note = notes.find( n => n.id === id)
   
       if(note) {
          return response.json(note)}
         else {
             return response.status(404).end()}}
         
    )

    app.delete('/api/notes/:id',(request, response) => {
      const id = Number(request.params.id)
      const notesFiltered =  notes.filter( n => n.id !== id)

      if( notesFiltered.length !== notes.length) { notes = notesFiltered
          return response.status(204).end()}
      return response.status(404).end()
    })

    app.post('/api/notes', (request, response) => {
       const content = request.body
       if (!body.content) { 
         return response
         .status(400)
         .json({error:"content is missing"})}
       
      const note = {
             ...body.content, 
             id:genId(),
             important: content.important || false}
       notes.push(note)
       response.json(note)
    })

    const unknownEndPoint = (request, response) => {
      response.status(404).send({ error: "unknown EndPoint"})
    }

    app.use(unknownEndPoint)


const PORT = 3001
app.listen(PORT)
console.log(`the server is running on PORT ${PORT}`)