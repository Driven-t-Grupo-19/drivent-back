import { AuthenticatedRequest } from '@/middlewares';
import purchaseService from '@/services/purchases-service';
import httpStatus from 'http-status';
import { Response } from 'express';

export async function getPurchaseByUser(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    
    const purchase = await purchaseService.getPurchaseByUserId(userId);
    
    return res.status(httpStatus.OK).send(purchase);
};


export async function postCreateOrUpdatePurchase(req: AuthenticatedRequest, res: Response) {
    await purchaseService.createOrUpdatePurchase({
        ...req.body,
        userId:req.userId
    })

    return res.sendStatus(httpStatus.OK);
}