'use strict'

exports.up = function (r, connection) {
  return Promise.all([
    r
      .tableCreate('users')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      })
  ])
    .then(() => {
      Promise.all([
        r
          .table('users')
          .indexCreate('username')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('users')
          .indexCreate('mobile')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('users')
          .indexCreate('wechatProviderId')
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
      .tableDrop('users')
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
