var mysql = require('mysql');

var connection = mysql.createPool({
  connectionLimit : 10,
  host : '127.0.0.1',
  user : 'root',
  password : 'root',
  database : 'tea-chain'
});

const _delete = (sql) => {
  return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err.message)
            } else {
                resolve(result)
            }
        })
  })
}

const _update = (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err.message)
            } else {
                resolve(result)
            }
        })
    })
}

const _insert = (sql, values) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, values, (err, result) => {
            if (err) {
                reject(err.message)
            } else {
                resolve(result)
            }
        })
    })
}

const _selectAll = (sql) => {
  return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) {
                reject(err.message)
            } else {
                resolve(result)
            }
        })
  })
}

module.exports = {
  insert: _insert,
  select: _selectAll,
  delete: _delete,
  update: _update
}