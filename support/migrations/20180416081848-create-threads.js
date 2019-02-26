'use strict'

exports.up = function (r, connection) {
  return r
    .tableCreate('threads')
    .run(connection)
    .then(() => {
      return Promise.all([
        r
          .table('threads')
          .indexCreate('creatorId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('threads')
          .indexCreate('channelId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('threads')
          .indexCreate('communityId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('threads')
          .indexCreate('lastActive')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('threads')
          .indexCreate('communityIdAndLastActive', [r.row('communityId'), r.row('lastActive')])
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('threads')
          .indexCreate('channelIdAndLastActive', [r.row('channelId'), r.row('lastActive')])
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
    .tableDrop('threads')
    .run(connection)
    .catch(err => {
      console.log(err)
      throw err
    })
}
