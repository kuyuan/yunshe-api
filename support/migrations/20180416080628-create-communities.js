'use strict'

exports.up = function (r, connection) {
  return Promise.all([
    r
      .tableCreate('communities')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      })
  ])
    .then(() => {
      Promise.all([
      // index communities
        r
          .table('communities')
          .indexCreate('createdAt')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('communities')
          .indexCreate('name')
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
      .tableDrop('communities')
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
