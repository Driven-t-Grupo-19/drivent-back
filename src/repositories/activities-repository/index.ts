import { prisma } from "@/config";

async function getActivities() {
    return prisma.activities.findMany({
        orderBy: { day: 'asc' },
    })
}

const activitiesRepository = {
    getActivities
}

export default activitiesRepository;
