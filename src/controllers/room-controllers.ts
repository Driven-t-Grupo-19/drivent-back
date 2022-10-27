import { AuthenticatedRequest } from '@/middlewares';
import acommodationService from '@/services/room-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getAcommodations(req: AuthenticatedRequest, res: Response){
    const id:number = Number(req.params.id);

    const acommodations = await acommodationService.listByHotelId(id);

    return res.status(httpStatus.OK).send(acommodations);
}