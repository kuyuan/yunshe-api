import { Prisma } from "@prisma/index";

export default new Prisma({ endpoint: process.env.PRISMA_ENDPOINT });
