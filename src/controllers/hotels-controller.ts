import { Request, Response } from "express";
import hotelsService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function reserveAccommodation(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { accommodationId } = req.body;

    await hotelsService.reserveAccommodation(accommodationId, userId);

    return res.sendStatus(httpStatus.CREATED);
}

export async function getAccommodationByUserId(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    const accommodation = hotelsService.getAccommodationByUserId(userId);

    return res.status(httpStatus.OK).send(accommodation);
}

export async function getHotels(req: Request, res: Response) {
    const hotels = hotelsService.getHotels();

    return res.status(httpStatus.OK).send(hotels);
}
