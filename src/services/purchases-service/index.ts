import purchaseRepository from "@/repositories/purchases-repository";
import { Purchases } from "@prisma/client";
import { notFoundError } from '@/errors';
import { exclude } from "@/utils/prisma-utils";

type PurchasesCreate = Omit<Purchases, 'id'>

async function getPurchaseByUserId(userId: number) {
    const purchaseById = purchaseRepository.findPurchase(userId)
    if(!purchaseById) throw notFoundError();
    return purchaseById;
}

async function createOrUpdatePurchase(purchase: PurchasesCreate) {
    await purchaseRepository.upsertPurchase(purchase.userId, purchase, exclude(purchase, 'userId'))
    return
}


const purchaseService = {
    getPurchaseByUserId, 
    createOrUpdatePurchase
}

export default purchaseService;