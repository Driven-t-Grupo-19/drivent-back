import { prisma } from '@/config';
import { Acommodations } from '@prisma/client';

async function listByHotelId(id:number){
    return await prisma.acommodations.findMany({where:{hotelId:id}});
};

const acommodationsRepository = {
    listByHotelId
};

export default acommodationsRepository;