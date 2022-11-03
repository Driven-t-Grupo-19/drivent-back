import activityRepository from '@/repositories/activity-repository';

async function findActivities() {
    const activities = await activityRepository.getActivities();

    return activities;
};


const activitiesService = {
    findActivities
};

export default activitiesService;