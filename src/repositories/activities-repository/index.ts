import { prisma } from "@/config";

async function getActivities() {
    return await prisma.activities.findMany({
        orderBy: { day: 'asc' },
    })
}

async function getUserActivitiesById(id: number) {
    return await prisma.activities.findMany({
        where: {
            users:{
                has: id
            },
        }
    })
}

async function getInfoActivityById(id: number) {
    return await prisma.activities.findFirst({
        where: { id }
    })
}

async function deleteActivity(id: number, userId: number) {
    try {
        return await prisma.$transaction(async(prisma)=> {
            const {users} = await prisma.activities.findFirst({
                where: { 
                    id, 
                },
                select: {
                    users: true
                }
            }) 
            const filterUser = users.filter((id: number) => id !== userId)
            return await prisma.activities.update({
                where: {
                  id,
                },
                data: {
                  users: {
                    set: filterUser
                  }, slots: {
                    increment: 1
                  }
                },
              })
    })
    } catch(error){
        console.log(error)
    }
}

async function reserveActivity(id: number, userId: number) {
    try {
        return await prisma.$transaction(async(prisma) => {
            const activity = await prisma.activities.findFirst({
                where: {id}
            })
            
            const activitiesUsers = [...activity.users, userId]

            return await prisma.activities.update({where: {id}, data: {
                users: {
                    set: activitiesUsers
                },
                slots: {
                    decrement: 1
                }
            } })
        })
    } catch(error){
        console.log(error)
    }
}


const activitiesRepository = {
    getActivities,
    getInfoActivityById,
    getUserActivitiesById,
    deleteActivity,
    reserveActivity
}

export default activitiesRepository;
