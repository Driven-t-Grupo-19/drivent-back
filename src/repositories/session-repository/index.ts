import { prisma } from '@/config';
import { Prisma } from '@prisma/client';

async function create(data: Prisma.SessionUncheckedCreateInput) {
  return prisma.session.create({
    data,
  });
}

async function find(token: any) {
  return prisma.session.findFirst({
    where: { token }
  });
}

async function upsert(data: Prisma.SessionUncheckedCreateInput) {
  const session = await prisma.session.findFirst({
    where: {
      userId: data.userId,
    },
  });
  
  if (!session){
    return prisma.session.create({
      data,
    });
  }

  return prisma.session.update({
    where: {
      id: session.id,
    },
    data: {
      token: data.token,
    },
  });
}

const sessionRepository = {
  create, upsert, find
};

export default sessionRepository;
