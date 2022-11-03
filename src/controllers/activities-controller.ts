import { AuthenticatedRequest } from '@/middlewares';
import { Response } from 'express';
import httpStatus from 'http-status';
import activitiesService from '@/services/activities-service';

export async function getActivities(req: AuthenticatedRequest, res: Response) {
  console.log(1)
  const activities = await activitiesService.findActivities();
  console.log(activities)

  return res.status(httpStatus.OK).send(activities);
}
