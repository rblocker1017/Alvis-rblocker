const express = require('express')
const app = express()
const port = 3001

const db = require('./alvis_model')

app.use(express.json())

app.get('/', (req, res) => {
    res.status(200).send('Hello World!');
})

app.get('/users', db.getUsers)
app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})

