import { conflictError, notFoundError } from '@/errors';
import hotelsRepository from '@/repositories/hotels-repository';

async function reserveAccommodation(accommodationId: number, userId: number) {
    await testIfAccommodationIsOccupied(accommodationId);

    await hotelsRepository.reserveAccommodation(accommodationId, userId);
}

async function getAccommodationByUserId(userId: number) {
    const accommodation = await hotelsRepository.getAccommodationByUserId(userId);
    if(!accommodation) throw notFoundError();

    return accommodation;
}

async function getHotels() {
    const hotels = await hotelsRepository.getHotels();
    if(!hotels) throw notFoundError();

    return hotels;
}

async function testIfAccommodationIsOccupied(accommodationId: number) {
    const accommodation = hotelsRepository.getAccommodationById(accommodationId);

    if (accommodation) throw conflictError("This accommodation is already occupied!");
}

const hotelsService = {
    reserveAccommodation,
    getAccommodationByUserId,
    getHotels
}

export default hotelsService;
