import { getAccommodationByUserId, getHotels, reserveAccommodation } from '@/controllers/hotels-controller';
import { authenticateToken } from '@/middlewares';
import { Router } from 'express';

const hotelsRouter = Router();

hotelsRouter.put('/new-reservoir', authenticateToken, reserveAccommodation);
hotelsRouter.get('/user-reservoir', authenticateToken, getAccommodationByUserId);
hotelsRouter.get('/list', getHotels);

export { hotelsRouter };
