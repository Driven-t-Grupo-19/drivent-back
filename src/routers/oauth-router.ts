import { oAuthLogin } from '@/controllers/oauth-controller';
import { Router } from 'express';

const oAuthRouter = Router();

oAuthRouter.post('/login', oAuthLogin);

export { oAuthRouter };
