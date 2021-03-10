const express = require('express')
const bcrypt  = require('bcrypt')
const crypto  = require('crypto')
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
  hashPassword(password)
  db.addLogin(hashPassword, email)
  db.addUser(username, email)  
})

//returns true if hash and email match, false if they don't
function validateHash(email, hash) {
  db.validate(email, hash)
  .then(valid => console.log(valid))
  .catch(err => console.error(err));
  
}

//invokes Bcrypt salt and hash, 10 salt rounds
const hashPassword = (password) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      err ? reject(err) : resolve(hash)
    })
  )
}

//verift plain text password against hash
const checkPassword = (password, hashPassword) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, hashPassword, (err, response) => {
        if (err) {
          reject(err)
        }
        else if (response) {
          resolve(response)
        } else {
          reject(new Error('Passwords do not match.'))
        }
    })
  )
}

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

