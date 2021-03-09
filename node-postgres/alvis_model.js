const {Pool} = require('pg')

/*const pool = new Pool({
  user: 'alvis',
  host: 'localhost',
  database: 'alvis_db',
  password: 'buzzdev123',
  port: 5432,
});*/

let connString = 'postgres://iwqzigmkdqwrsx:d56e6f5bdac388d778c65d81cca2ad6d169263bab208239266e728bc53cea03b@ec2-54-90-55-211.compute-1.amazonaws.com:5432/dd3df33hrh6sfk';

const pool = new Pool({
  connectionString : connString,
  ssl: {rejectUnauthorized: false}
});


const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const addUser = (id, hash, email) => {
  pool.query('INSERT INTO login(id, hash, email) VALUES($1, $2, $3)',[id, hash, email], (error, results) => {
    if (error) {
      throw error
    }
  })
}

  module.exports = {
    getUsers,
    addUser
  }


  