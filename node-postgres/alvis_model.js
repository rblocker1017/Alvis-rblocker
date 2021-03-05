const Pool = require('pg').Pool

const pool = new Pool({
  user: 'alvis',
  host: 'localhost',
  database: 'alvis_db',
  password: 'buzzdev123',
  port: 5432,
});

const getUsers = (request, response) => {
    pool.query('SELECT * FROM login ORDER BY id ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }

  module.exports = {
    getUsers,
  }


  