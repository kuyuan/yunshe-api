'use strict'

exports.up = function (r, connection) {
  return Promise.all([
    r
      .tableCreate('messages')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      })
  ])
    .then(() => {
      return Promise.all([
        r
          .table('messages')
          .indexCreate('threadId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('messages')
          .indexCreate('threadIdAndTimestamp', [r.row('threadId'), r.row('timestamp')])
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          })
      ])
    })
    .catch(err => {
      console.log(err)
      throw err
    })
}

exports.down = function (r, connection) {
  return Promise.all([
    r
      .tableDrop('messages')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableDrop('reactions')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      })
  ])
    .catch(err => {
      console.log(err)
      throw err
    })
}
