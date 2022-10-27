import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAcommodations } from '@/controllers/room-controllers';

const roomRouter = Router();

roomRouter
    .all('/*', authenticateToken)
    .get('/acommodations/:id', getAcommodations)

export { roomRouter };
