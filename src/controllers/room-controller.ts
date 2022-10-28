import { AuthenticatedRequest } from '@/middlewares';
import accommodationService from '@/services/room-service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function getAcommodations(req: AuthenticatedRequest, res: Response){
    const id:number = Number(req.params.id);

    const accommodations = await accommodationService.listByHotelId(id);

    return res.status(httpStatus.OK).send(accommodations);
};

export async function bookRoom(req: AuthenticatedRequest, res: Response){
    const id:number = Number(req.params.id);
    const { userId } = req;

    await accommodationService.bookRoomByNumber(id, userId);

    return res.sendStatus(httpStatus.OK)
};

export async function getUserRoom(req: AuthenticatedRequest, res: Response){
    const { userId } = req;

    const room = await accommodationService.findRoom(userId);

    return res.status(httpStatus.OK).send(room);
};
