const express = require('express')
const app = express()
const bcrypt  = require('bcrypt')
const cors = require("cors");
const port = 3001

const db = require('./alvis_model');
const { wait } = require('@testing-library/dom');

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.get('/users', db.getUsers)

const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
}

// Whenever sign up is clicked, this function is called 
app.post("/register", (req, res) => {
  const email = req.body.email
  const password = bcrypt.hashSync(String(req.body.password), 10)
  const username = req.body.username
  db.addLogin(password, email)
  db.addUser(username, email)  
})


app.post("/login", (req, res) => {
  const loginEmail = req.body.loginEmail
  const loginPassword = req.body.loginPassword
  db.validate(loginEmail, loginPassword)
  .then(valid => res.send(String(valid)))
  .catch(err => console.error(err));
})


app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

