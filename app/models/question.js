const db = require('../../lib/db')

function checkRecordFound (res) {
  if (res.rowCount === 0) {
    throw new Error('record not found')
  }
}

class Question {
  static all () {
    return db.query('SELECT * FROM questions;')
  }

  static findById (id) {
    return db.query(
      'SELECT * FROM question WHERE id = $1;',
      [id]
    ).then(checkRecordFound)
  }

  static insert (params) {
    return db.query(
      `INSERT INTO questions (body, posted_by) VALUES ($1, $2) RETURNING *;`,
      [params.body, params.posted_by]
    )
  }

  static delete (id) {
    return db.query('DELETE FROM questions WHERE id = $1;', [id])
  }
}

module.exports = Question
