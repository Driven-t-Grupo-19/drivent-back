import { getActivities } from "@/controllers/activities-controller";
import { Router } from "express";

const activitiesRouter = Router();

activitiesRouter.get('/', getActivities);

export { activitiesRouter };
