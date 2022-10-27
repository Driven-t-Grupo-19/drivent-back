import acommodationsRepository from "@/repositories/room-repository";

async function listByHotelId(id:number) {
    const acommodations = await acommodationsRepository.listByHotelId(id);

    return acommodations;
};

const acommodationService = {
    listByHotelId
};

export default acommodationService;