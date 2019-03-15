const constants = require('./constants');
const {
  WUQIAN_ID,
  CAOYAN_ID,
  BRAN_ID,
  QUIET_USER_ID,
  BLOCKED_USER_ID,
  PREVIOUS_MEMBER_USER_ID,
  CHANNEL_MODERATOR_USER_ID,
  COMMUNITY_MODERATOR_USER_ID,
  DATE
} = constants;

module.exports = [
  {
    _id: WUQIAN_ID,
    name: '吴倩',
    description: '我是一个会计，我不会写代码',
    username: 'wuqian',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar1.jpg',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg',
    wechatProviderId: 'wechatProvider1990010101',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: CAOYAN_ID,
    name: '曹言',
    description: '我是公安局的警员，我也不会写代码',
    username: 'caoyan',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar2.jpg',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover2.jpg',
    wechatProviderId: 'wechatProvider1990010102',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: BRAN_ID,
    name: '酷猿创始人',
    description: '南京酷猿信息技术有限公司创始人，资深WEB开发者',
    username: 'bran',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar3.jpg',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover3.jpg',
    wechatProviderId: 'wechatProvider1990010103',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: QUIET_USER_ID,
    name: '新用户',
    description: '刚刚注册，还没有加入任何社区或频道',
    username: 'newbee',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar4.jpg',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover4.jpg',
    wechatProviderId: 'wechatProvider1990010104',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: BLOCKED_USER_ID,
    name: '屏蔽用户',
    description: '我被系统屏蔽了',
    username: 'blocked',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar5.jpg',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover5.jpg',
    wechatProviderId: 'wechatProvider1990010105',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: PREVIOUS_MEMBER_USER_ID,
    name: '前云社成员',
    description: '之前加入过云社，后来退出了',
    username: 'previous-user',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar6.jpg',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover6.jpg',
    wechatProviderId: 'wechatProvider1990010106',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: CHANNEL_MODERATOR_USER_ID,
    name: '频道管理员',
    description: '我是频道管理员，我管理所有频道',
    username: 'channel-moderator',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar7.jpg',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover7.jpg',
    wechatProviderId: 'wechatProvider1990010107',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: COMMUNITY_MODERATOR_USER_ID,
    name: '社区管理员',
    description: '我是社区管理员，我管理所有的社区',
    username: 'community-moderator',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/avatar/avatar8.jpg',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover8.jpg',
    wechatProviderId: 'wechatProvider1990010108',
    createdAt: DATE,
    lastSeen: DATE
  }
]