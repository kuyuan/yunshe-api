'use strict'

exports.up = function (r, connection) {
  return Promise.all([
    r
      .tableCreate('usersCommunities')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableCreate('usersChannels')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableCreate('usersDirectMessageThreads')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableCreate('usersNotifications')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableCreate('usersThreads')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      })
  ])
    .then(() => {
      return Promise.all([
      // index on usersNotifications
        r
          .table('usersNotifications')
          .indexCreate('userId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersNotifications')
          .indexCreate('notificationId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersNotifications')
          .indexCreate('userIdAndEntityAddedAt', [r.row('userId'), r.row('entityAddedAt')])
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersNotifications')
          .indexCreate('userIdAndNotificationId', [r.row('userId'), r.row('notificationId')])
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        // index on usersCommunities join table
        r
          .table('usersCommunities')
          .indexCreate('userId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersCommunities')
          .indexCreate('communityId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersCommunities')
          .indexCreate('userIdAndCommunityId', [r.row('userId'), r.row('communityId')])
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        // indexes on usersChannels join table
        r
          .table('usersChannels')
          .indexCreate('userId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersChannels')
          .indexCreate('channelId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersChannels')
          .indexCreate('userIdAndChannelId', [r.row('userId'), r.row('channelId')])
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        // indexes on usersThreads
        r
          .table('usersThreads')
          .indexCreate('threadId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersThreads')
          .indexCreate('userId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersThreads')
          .indexCreate('userIdAndThreadId', [r.row('userId'), r.row('threadId')])
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersThreads')
          .indexCreate('userIdAndIsParticipant', [r.row('userId'), r.row('isParticipant')])
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        // indexes on usersDirectMessageThreads join table
        r
          .table('usersDirectMessageThreads')
          .indexCreate('userId')
          .run(connection)
          .catch(err => {
            console.log(err)
            throw err
          }),
        r
          .table('usersDirectMessageThreads')
          .indexCreate('threadId')
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
      .tableDrop('usersCommunities')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableDrop('usersChannels')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableDrop('usersDirectMessageThreads')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableDrop('usersThreads')
      .run(connection)
      .catch(err => {
        console.log(err)
        throw err
      }),
    r
      .tableDrop('usersNotifications')
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
