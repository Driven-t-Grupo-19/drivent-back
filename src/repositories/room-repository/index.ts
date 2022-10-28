import { prisma } from '@/config';
import { Accommodations } from '@prisma/client';

async function listByHotelId(id: number) {
    return await prisma.accommodations.findMany({ where: { hotelId: id } });
};

async function findRoomById(id:number) {
    return await prisma.accommodations.findFirst({where:{id}});
};

async function bookRoom(room:Accommodations) {
    await prisma.accommodations.upsert({
        where:{
            id:room.id
        },
        create:room,
        update:room
    });
};

async function findByUserId(id:number) {
    return await prisma.accommodations.findMany({
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

const acommodationsRepository = {
    listByHotelId,
    bookRoom,
    findRoomById,
    findByUserId
};

export default acommodationsRepository;