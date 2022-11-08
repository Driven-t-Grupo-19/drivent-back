import { getActivities, reserveActivities } from "@/controllers/activities-controller";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);
activitiesRouter.post('/', reserveActivities);

export { activitiesRouter };
