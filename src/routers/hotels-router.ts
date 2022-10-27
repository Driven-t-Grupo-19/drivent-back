import { getHotels } from '@/controllers/hotels-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const hotelsRouter = Router();

hotelsRouter.get('/list', getHotels);

export { hotelsRouter };
