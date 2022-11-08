import { Request, Response } from "express";
import activitiesService from '@/services/activities-service';
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";


export async function getActivities(req: Request, res: Response) {
    const activities = await activitiesService.getActivities();

    res.status(httpStatus.OK).send(activities);
}

export async function reserveActivities(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { id } = req.body;
    const activities = await activitiesService.reserve(id, userId)
    res.status(httpStatus.OK).send(activities);
}