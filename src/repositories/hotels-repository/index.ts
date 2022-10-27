import { prisma } from '@/config';

async function reserveAccommodation(accomodationId: number, userId: number) {
    return prisma.accommodations.update({
        where: {
            id: accomodationId
        },
        data: {
            isOccupied: true,
            userId: userId
        }
    })
}

async function getAccommodationByUserId(userIdFromQuery: number) {
    return prisma.accommodations.findFirst({ where: { userId: userIdFromQuery } })
}

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

async function getAccommodationById(accommodationIdFromQuery: number) {
    return prisma.accommodations.findFirst({
        where: {
            id: accommodationIdFromQuery
        }
    })
}

const hotelsRepository = {
    reserveAccommodation,
    getAccommodationByUserId,
    getHotels,
    getAccommodationById
}

export default hotelsRepository;
