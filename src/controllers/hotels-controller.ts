import { Request, Response } from "express";
import hotelsService from "@/services/hotels-service";
import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";

export async function getHotels(req: Request, res: Response) {
    const hotels = hotelsService.getHotels();

    return res.status(httpStatus.OK).send(hotels);
}
