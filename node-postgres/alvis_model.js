const {Pool} = require('pg')

let connString = 'postgres://iwqzigmkdqwrsx:d56e6f5bdac388d778c65d81cca2ad6d169263bab208239266e728bc53cea03b@ec2-54-90-55-211.compute-1.amazonaws.com:5432/dd3df33hrh6sfk';

const pool = new Pool({
  connectionString : connString,
  ssl: {rejectUnauthorized: false}
});

function validate(email, hash)
{
  return new Promise((resolve, reject) => 
    pool.query('SELECT * FROM login WHERE email = $1 AND hash = $2 ', [email, hash], (error, result) => {
      if (error) {
        return reject(err);
      }
      if(result.rows.length === 1)
      {
        resolve(true);
      }
      else{
        resolve(false);
      }
    }))
}

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

const getLogin = (request, response) => {
  pool.query('SELECT hash FROM login WHERE email = $1', [email], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const addLogin = (hash, email) => {
  pool.query('INSERT INTO login(hash, email) VALUES($1, $2)',[hash, email], (error, results) => {
    if (error) {
      throw error
    }
  })
}
const addUser = (name, email) => {
  pool.query('INSERT INTO users(name, email) VALUES($1, $2)',[name, email], (error, results) => {
    if (error) {
      throw error
    }
  })
}

  module.exports = {
    getUsers,
    addLogin,
    addUser,
    validate,
  }


  