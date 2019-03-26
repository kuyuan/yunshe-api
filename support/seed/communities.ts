import {
  DATE,
  YUNSHE_COMMUNITY_ID,
  DELETED_COMMUNITY_ID,
  PRIVATE_COMMUNITY_ID
} from "./constants";

export default [
  {
    _id: YUNSHE_COMMUNITY_ID,
    createdAt: DATE,
    isPrivate: false,
    name: '云社官方社区',
    description: 'Next generation online community',
    website: 'https://www.yunshe.fun',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.png',
    tags: ['community', 'social'],
    memberCount: 9
  },
  {
    _id: DELETED_COMMUNITY_ID,
    createdAt: DATE,
    deletedAt: DATE,
    isPrivate: false,
    name: '已删除社区',
    description: 'Deleted Already',
    website: 'https://www.yunshe.fun/deleted',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm2.png',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover2.png',
    memberCount: 8
  },
  {
    _id: PRIVATE_COMMUNITY_ID,
    createdAt: DATE,
    isPrivate: true,
    name: '私人社区',
    description: '不开放访问',
    website: 'https://www.yunshe.fun/secret',
    profilePhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm3.png',
    coverPhoto: 'https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover3.png',
    tags: [],
    memberCount: 3
  }
]