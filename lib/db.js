const { Pool } = require('pg')
const pool = new Pool({
  database: 'battlequiz'
})

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  }
}
