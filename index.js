require("dotenv").config();
const express = require("express");
const app = express()
const mongoose = require("mongoose");
const Note = require("./models/note");


//Self note: cors allows requests from all possible origins (in this case PORTS 3000 and 3001)
const cors = require("cors");
app.use(cors())
app.use(express.static("build"));
app.use(express.json());

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError"){
    return response.status(400).send({error:"Malformated id"})
  }
  next(error)
}

app.use(errorHandler);

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

const generateId = () => {
  const maxId = notes.length > 0 
  ? Math.max(...notes.map(n => n.id)) 
  : 0

  return maxId +1;
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (body.content === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save().then(savedNote => {
    response.json(savedNote)
  })
})


app.get("/", (request, response) =>  {
  response.send("<h1>Hello World!</h1>")
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes)
  })
})

app.get("/api/notes/:id", (request,response, next) => {
  Note.findById(request.params.id).then(note => {
    if (note){
      response.json(note);
    } else {
      response.status(404).end();
    }
  })
  .catch(error => next(error))
})

app.delete("/api/notes/:id", (request, response,next) => {
  Note.findByIdAndRemove(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, {new: true})
  .then(updatedNote => {
    response.json(updatedNote)
  })
  .catch(error => next(error));
})

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
} )