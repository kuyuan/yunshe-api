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
    profilePhoto: 'https://img.gs/jztmrqvgzv/500/mxstbr.com/headshot.jpeg',
    coverPhoto: 'https://pbs.twimg.com/profile_banners/2451223458/1479507323/1500x500',
    wechatProviderId: 'wechatProvider1990010101',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: CAOYAN_ID,
    name: '曹言',
    description: '我是公安局的警员，我也不会写代码',
    username: 'caoyan',
    profilePhoto: 'https://pbs.twimg.com/profile_images/570313913648955392/cf4tgX7M_bigger.jpeg',
    coverPhoto: 'https://pbs.twimg.com/profile_banners/465068802/1490051733/1500x500',
    wechatProviderId: 'wechatProvider1990010102',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: BRAN_ID,
    name: '酷猿创始人',
    description: '南京酷猿信息技术有限公司创始人，资深WEB开发者',
    username: 'bran',
    profilePhoto: 'https://pbs.twimg.com/profile_images/848823167699230721/-9CbPtto_bigger.jpg',
    coverPhoto: 'https://pbs.twimg.com/profile_banners/17106008/1491444958/1500x500',
    wechatProviderId: 'wechatProvider1990010103',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: QUIET_USER_ID,
    name: '新用户',
    description: '刚刚注册，还没有加入任何社区或频道',
    username: 'newbee',
    profilePhoto: 'https://pbs.twimg.com/profile_images/848823167699230721/-9CbPtto_bigger.jpg',
    coverPhoto: 'https://pbs.twimg.com/profile_banners/17106008/1491444958/1500x500',
    wechatProviderId: 'wechatProvider1990010104',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: BLOCKED_USER_ID,
    name: '屏蔽用户',
    description: '我被系统屏蔽了',
    username: 'blocked',
    profilePhoto: 'https://pbs.twimg.com/profile_images/848823167699230721/-9CbPtto_bigger.jpg',
    coverPhoto: 'https://pbs.twimg.com/profile_banners/17106008/1491444958/1500x500',
    wechatProviderId: 'wechatProvider1990010105',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: PREVIOUS_MEMBER_USER_ID,
    name: '前云社成员',
    description: '之前加入过云社，后来退出了',
    username: 'previous-user',
    profilePhoto: 'https://pbs.twimg.com/profile_images/848823167699230721/-9CbPtto_bigger.jpg',
    coverPhoto: 'https://pbs.twimg.com/profile_banners/17106008/1491444958/1500x500',
    wechatProviderId: 'wechatProvider1990010106',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: CHANNEL_MODERATOR_USER_ID,
    name: '频道管理员',
    description: '我是频道管理员，我管理所有频道',
    username: 'channel-moderator',
    profilePhoto: 'https://pbs.twimg.com/profile_images/848823167699230721/-9CbPtto_bigger.jpg',
    coverPhoto: 'https://pbs.twimg.com/profile_banners/17106008/1491444958/1500x500',
    wechatProviderId: 'wechatProvider1990010107',
    createdAt: DATE,
    lastSeen: DATE
  },
  {
    _id: COMMUNITY_MODERATOR_USER_ID,
    name: '社区管理员',
    description: '我是社区管理员，我管理所有的社区',
    username: 'community-moderator',
    profilePhoto: 'https://pbs.twimg.com/profile_images/848823167699230721/-9CbPtto_bigger.jpg',
    coverPhoto: 'https://pbs.twimg.com/profile_banners/17106008/1491444958/1500x500',
    wechatProviderId: 'wechatProvider1990010108',
    createdAt: DATE,
    lastSeen: DATE
  }
]