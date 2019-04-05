import { Community, CommunityCreateInput, CommunityUpdateInput } from "@prisma/index";
import { uploadImage } from "@utils/cos";
import {
  NotAllowedError,
  NotFoundError,
} from "@utils/errors";
import { File } from "@utils/interfaces";
import {
  canUpdateCommunity,
  canViewCommunity,
} from "@utils/permissions";
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

export interface UserCreateCommunityInput {
  name: string;
  description: string;
  website?: string;
  isPrivate: boolean;
  profileFile?: File;
  coverFile?: File;
}

export const createCommunity = async (userId: string, input: UserCreateCommunityInput): Promise<Community> => {
  const communityCreateInput: CommunityCreateInput = {
    name: input.name,
    description: input.description,
    coverPhoto: defaultCommunityCoverPhoto,
    profilePhoto: defaultCommunityProfilePhoto,
    isPrivate: input.isPrivate,
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

export interface UserUpdateCommunityInput {
  communityId: string;
  description?: string;
  website?: string;
  isPrivate?: boolean;
  profileFile?: File;
  coverFile?: File;
}

export const updateCommunity = async (userId: string, input: UserUpdateCommunityInput): Promise<Community> => {
  let community = await prisma.community({ id: input.communityId });
  if (!community) {
    throw new NotFoundError();
  }
  if (await canUpdateCommunity(userId, community)) {
    const inputData: CommunityUpdateInput = {};
    if (input.description !== null) {
      inputData.description = input.description;
    }
    if (input.isPrivate !== null) {
      inputData.isPrivate = input.isPrivate;
    }
    if (input.website !== null) {
      inputData.website = input.website;
    }
    if (input.coverFile) {
      const converUploadResponse = await uploadImage(input.coverFile, "Community", community.id);
      if (converUploadResponse.statusCode === 200) {
        inputData.coverPhoto = converUploadResponse.Location;
      }
    }
    if (input.profileFile) {
      const profileUploadResponse = await uploadImage(input.profileFile, "Community", community.id);
      if (profileUploadResponse.statusCode === 200) {
        inputData.profilePhoto = profileUploadResponse.Location;
      }
    }
    community = await prisma.updateCommunity({ data: inputData, where: { id: community.id } });
    return community;
  } else {
    throw new NotAllowedError();
  }
};
