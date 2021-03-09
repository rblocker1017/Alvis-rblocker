const express = require('express')
const app = express()
const cors = require("cors");
const port = 3001

const db = require('./alvis_model')

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.get('/users', db.getUsers)

app.post("/register", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const username = req.body.username
  db.addUser("123", password, username)
  
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

