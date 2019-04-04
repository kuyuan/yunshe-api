import { Community, CommunityCreateInput, CommunityUpdateInput } from "@prisma/index";
import { uploadImage } from "@utils/cos";
import { File } from "@utils/interfaces";
import { canViewCommunity } from "@utils/permissions";
import prisma from "@utils/prisma";

export const defaultCommunityCoverPhoto = "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/cover/cover1.jpg";
export const defaultCommunityProfilePhoto = "https://yunshe-sample-1256437689.cos.ap-shanghai.myqcloud.com/community/comm1.png";

export const getCommunityById = async (communityId: string, userId: string): Promise<Community> => {
  const community = await prisma.community({ id: communityId });
  if (!community || community.deletedAt) {
    return null;
  }
  if (await canViewCommunity(userId, community)) {
    return community;
  } else {
    return null;
  }
};

export interface CreateCommunityInput {
  name: string;
  description: string;
  website?: string;
  isPrivate?: boolean;
  profileFile: File;
  coverFile?: File;
}

export const createCommunity = async (userId: string, input: CreateCommunityInput) => {
  const communityCreateInput: CommunityCreateInput = {
    name: input.name,
    description: input.description,
    coverPhoto: defaultCommunityCoverPhoto,
    profilePhoto: defaultCommunityProfilePhoto,
  };
  // Create community
  let community = await prisma.createCommunity(communityCreateInput);
  // Create UserCommunity
  await prisma.createUserCommunity({
    userId,
    communityId: community.id,
    status: "ACTIVE",
    role: "OWNER",
  });
  // Update Community Images
  const communityUpdateInput: CommunityUpdateInput = {};
  if (input.profileFile) {
    const profileUploadResponse = await uploadImage(input.profileFile, "Community", community.id);
    if (profileUploadResponse.statusCode === 200) {
      communityUpdateInput.profilePhoto = profileUploadResponse.Location;
    }
  }
  if (input.coverFile) {
    const coverUploadResponse = await uploadImage(input.coverFile, "Community", community.id);
    if (coverUploadResponse.statusCode === 200) {
      communityUpdateInput.coverPhoto = coverUploadResponse.Location;
    }
  }
  community = await prisma.updateCommunity({
    data: communityUpdateInput,
    where: { id: community.id },
  });
  return community;
};
