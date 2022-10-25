import { prisma } from '@/config';
import { Purchases } from '@prisma/client';

export type CreatePurchasesParams = Omit<Purchases, 'id' | 'createdAt' >;
export type UpdatePurchasesParams = Omit<CreatePurchasesParams, 'userId'>;


async function upsertPurchase(userId: number, createPurchase: CreatePurchasesParams, updatePurchase: UpdatePurchasesParams) {
    return prisma.purchases.upsert({
        where: {
            userId,
        }, 
        create: createPurchase,
        update: updatePurchase
    });

}


async function findPurchase(userId: number) {
    return prisma.purchases.findFirst({
        where: {
            userId
        }
    });

}

async function deletePurchase(userId: number) {
    return prisma.purchases.delete({
        where: {
            userId
        }
    });

}


const purchaseRepository = {
    upsertPurchase,
    findPurchase,
    deletePurchase
  };

export default purchaseRepository;