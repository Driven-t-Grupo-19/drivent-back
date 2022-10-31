import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getAcommodations, bookRoom, getUserRoom } from '@/controllers/room-controller';

const roomRouter = Router();

roomRouter
    .all('/*', authenticateToken)
    .get('/accommodations/:id', getAcommodations)
    .get('/user/accommodations', getUserRoom)
    .post('/accommodations/book/:id', bookRoom)

export { roomRouter };
