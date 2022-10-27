import { prisma } from '@/config';

async function getHotels() {
    return prisma.hotels.findMany({
        include: {
            Accommodations: true
        }
    })
}

const hotelsRepository = {
    getHotels,
}

export default hotelsRepository;
