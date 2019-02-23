export interface DBUser {
  id: string
  createdAt: string
  username: string
  name: string
  coverPhoto: string
  profilePhoto: string
  wechatProviderId?: string
  isOnline?: boolean
  lastSeen?: string
  description?: string
  website?: string
  modifiedAt?: string
}