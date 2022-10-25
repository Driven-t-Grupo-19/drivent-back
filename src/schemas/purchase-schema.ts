import Joi from 'joi';
import { Purchases } from '@prisma/client';

type PurchasesSchema = Omit<Purchases, 'id' | 'userId' | 'createdAt'  >

export const purchaseCreateSchema = Joi.object<PurchasesSchema>({
    total: Joi.number().required(),
    isOnline: Joi.boolean().required(),
    acommodation: Joi.boolean().required()
});
