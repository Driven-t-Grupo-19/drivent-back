//import { prisma } from '@/config';
import { Purchases } from '@prisma/client';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();



export type CreatePurchasesParams = Omit<Purchases, 'id' | 'createdAt' >;
export type UpdatePurchasesParams = Omit<CreatePurchasesParams, 'userId'>;


async function upsertPurchase(userId: number, createPurchase: CreatePurchasesParams, updatePurchase: UpdatePurchasesParams) {

    try{
        return await prisma.$transaction(async (prisma) => {

            const purchases = await prisma.purchases.upsert({
                    where: {
                        userId,
                    }, 
                    create: createPurchase,
                    update: updatePurchase
                });
    
            return purchases;
        });
    }catch(error){
        console.log(error);
    }

    // return prisma.purchases.upsert({
    //     where: {
    //         userId,
    //     }, 
    //     create: createPurchase,
    //     update: updatePurchase
    // });

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