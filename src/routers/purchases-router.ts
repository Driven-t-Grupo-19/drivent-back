import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { purchaseCreateSchema } from '@/schemas';
import { getPurchaseByUser, postCreateOrUpdatePurchase } from '@/controllers';

const purchasesRouter = Router();

purchasesRouter
  .all('/*', authenticateToken)
  .post('/', validateBody(purchaseCreateSchema), postCreateOrUpdatePurchase)
  .get('/', getPurchaseByUser)

export { purchasesRouter };
