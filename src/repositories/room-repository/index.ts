import { prisma } from '@/config';
import { Accommodations } from '@prisma/client';

async function listByHotelId(id: number) {
    return await prisma.accommodations.findMany({ where: { hotelId: id } });
};

async function findRoomById(id:number) {
    return await prisma.accommodations.findFirst({where:{id}});
};

async function bookRoom(room:Accommodations) {

    try{
        return await prisma.$transaction(async (prisma) => {

            return await prisma.accommodations.upsert({
                where:{
                    id:room.id
                },
                create:room,
                update:room
            });

        });
    }catch(error){
        console.log(error);
    }


};

async function findByUserId(id:number) {
    return await prisma.accommodations.findFirst({
        where:{
            users:{
                has: id
            },
        },
        include:{
            Hotel:true
        }
    })
}


async function deleteAcommodation(id: number, userId: number) {

    try{
        return await prisma.$transaction(async (prisma) => {

            const {users} = await prisma.accommodations.findFirst({
                where: { 
                    id, 
                },
                select: {
                    users: true
                }
            }) 
            const filterUser = users.filter((id: number) => id !== userId)
            
            return await prisma.accommodations.update({
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

        });
    }catch(error){
        console.log(error);
    }


}

const acommodationsRepository = {
    listByHotelId,
    bookRoom,
    findRoomById,
    findByUserId,
    deleteAcommodation
};

export default acommodationsRepository;