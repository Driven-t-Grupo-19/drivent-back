import { prisma } from '@/config';

async function getActivities() {
    return await prisma.activities.findMany({});
};

const activityRepository = {
    getActivities
};

export default activityRepository;