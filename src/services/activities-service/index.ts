import { conflictError, notFoundError } from '@/errors';
import activitiesRepository from '@/repositories/activities-repository';

async function getActivities() {
    const activities = await activitiesRepository.getActivities();
    if(!activities) throw notFoundError();

    return activities;
}


async function reserve(activityId: number, userId: number) {
    const activities = await activitiesRepository.getInfoActivityById(activityId)
    if(!activities) throw notFoundError();
    if(activities.users.includes(userId)) throw conflictError("Já cadastrado");
    const userActivities = await activitiesRepository.getUserActivitiesById(userId)
    const hourFiltered = userActivities.filter((activity) => {[activities.startsAt, activities.endsAt]})
    console.log(hourFiltered)
    
}


const activitiesService = {
    getActivities,
    reserve
}

export default activitiesService;
