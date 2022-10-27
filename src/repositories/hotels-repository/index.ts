import { prisma } from '@/config';

async function getHotels() {
    return prisma.hotels.findMany({
        select: {
            id: true,
            name: true,
            hotelPicture: true,
            Accommodations: true,
        }
    })
}

const hotelsRepository = {
    getHotels,
}

export default hotelsRepository;
