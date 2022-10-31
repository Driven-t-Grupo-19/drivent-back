import accommodationsRepository from "@/repositories/room-repository";
import { conflictError } from '@/errors';

async function listByHotelId(id:number) {
    const accommodations = await accommodationsRepository.listByHotelId(id);

    return accommodations;
};

async function bookRoomByNumber(id:number, userId:number) {
    const accommodation = await accommodationsRepository.findRoomById(id);
    if(accommodation.slots === 0 ) throw conflictError('vagas esgotadas!');

    const users:number[] = accommodation.users;
    const haveId = users.indexOf(userId)
    if(haveId !== -1) {
        return
    }

    const userAcommodation = await accommodationsRepository.findByUserId(userId)
    if(userAcommodation !== null){
        await accommodationsRepository.deleteAcommodation(userAcommodation.id, userId)
    }
    
    users.push(userId);

    accommodation.users = users;
    accommodation.slots -= 1;

    return await accommodationsRepository.bookRoom(accommodation);
};

async function findRoom(userId:number) {
    const accommodation = await accommodationsRepository.findByUserId(userId);

   return accommodation;
};

const accommodationService = {
    listByHotelId,
    bookRoomByNumber,
    findRoom
};

export default accommodationService;