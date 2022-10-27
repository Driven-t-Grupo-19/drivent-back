import { prisma } from '@/config';
import { Accommodations } from '@prisma/client';

async function listByHotelId(id: number) {
    return await prisma.accommodations.findMany({ where: { hotelId: id } });
};

const acommodationsRepository = {
    listByHotelId
};

export default acommodationsRepository;