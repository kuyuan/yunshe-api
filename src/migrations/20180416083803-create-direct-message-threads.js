'use strict'

exports.up = function (r, connection) {
  return Promise.all([
    r
      .tableCreate('directMessageThreads')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      })
  ])
    .then(() => {
      return r
        .table('directMessageThreads')
        .indexCreate('participants', { multi: true })
        .run(connection)
        .catch(err => {
          console.log(err)
          throw err
        })
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

exports.down = function (r, connection) {
  return r
    .tableDrop('directMessageThreads')
    .run(connection)
    .catch(err => {
      console.log(err)
      throw err
    })
}
