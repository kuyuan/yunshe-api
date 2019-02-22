'use strict'

exports.up = function (r, connection) {
  return r
    .tableCreate('notifications')
    .run(connection)
    .then(() => {
      return Promise.all([
        r
          .table('notifications')
          .indexCreate('contextId', r.row('context')('id'))
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('notifications')
          .indexCreate('modifiedAt')
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
  return r
    .tableDrop('notifications')
    .run(connection)
    .catch(err => {
      console.log(err)
      throw err
    })
}
