import { Request, Response } from "express";
import activitiesService from '@/services/activities-service';
import httpStatus from "http-status";

export async function getActivities(req: Request, res: Response) {
    const activities = await activitiesService.getActivities();

    res.status(httpStatus.OK).send(activities);
}
