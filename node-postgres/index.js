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

// Whenever sign up is clicked, this function is called 
app.post("/register", (req, res) => {
  const email = req.body.email
  const password = req.body.password
  const username = req.body.username
  db.addLogin(password, email)
  db.addUser(username, email)  
})

//returns true if hash and email match, false if they don't
function validateHash(email, hash)
{
  db.validate(email, hash)
  .then(valid => console.log(valid))
  .catch(err => console.error(err));
  
}

app.post("/login", (req, res) => {
  const loginEmail = req.body.loginEmail
  const loginPassword = req.body.loginPassword
  validateHash(loginEmail, loginPassword)
  res.send(db.getValidate())
})
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

