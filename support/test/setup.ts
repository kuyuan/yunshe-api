const path = require("path");
require('dotenv').config({ path: path.resolve(".env.test") })
import { Prisma } from "../../generated/prisma-client";

const prisma = new Prisma({ endpoint: process.env.PRISMA_ENDPOINT });

module.exports = async () => {
  await prisma.deleteManyUsers();
  await prisma.deleteManyCommunities();
  await prisma.deleteManyChannels();
  await prisma.deleteManyUserChannels();
  await prisma.deleteManyUserCommunities();
  await prisma.deleteManyThreads();
};
