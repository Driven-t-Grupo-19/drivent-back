import { PrismaClient } from '@prisma/client';
import dayjs from 'dayjs';
const prisma = new PrismaClient();

async function main() {
  let event = await prisma.event.findFirst();
  if (!event) {
    event = await prisma.event.create({
      data: {
        title: 'Driven.t',
        logoImageUrl: 'https://files.driveneducation.com.br/images/logo-rounded.png',
        backgroundImageUrl: 'linear-gradient(to right, #FA4098, #FFD77F)',
        startsAt: dayjs().toDate(),
        endsAt: dayjs().add(21, 'days').toDate(),
      },
    });
  }

  await createHotels();
  await createAcommodations();

  console.log({ event });
}

async function createHotels() {
  await prisma.hotels.createMany({
    data: [
      { name: 'Hotel dos Cria', hotelPicture: 'https://img.a.transfermarkt.technology/portrait/big/353108-1605189960.jpg?lm=1' },
      { name: 'Hotel dos De Verdade', hotelPicture: 'https://pbs.twimg.com/media/FeBhH7JXgAYbi7x?format=jpg&name=large' },
      { name: 'Hotel dos Brabo', hotelPicture: 'https://diariodofla.com.br/wp-content/uploads/2022/02/David-Luiz.jpg' }
    ]
  })
}

async function createAcommodations() {
  // First hotel
  await createAcommodationsByHotelId(1);

  // Second hotel
  await createAcommodationsByHotelId(2);

  // Third hotel
  await createAcommodationsByHotelId(3);
}

async function createAcommodationsByHotelId(hotelId: number) {
  await prisma.accommodations.createMany({
    data: [
      { number: 100, type: 'SINGLE', hotelId: hotelId, slots: 1 },
      { number: 101, type: 'DOUBLE', hotelId: hotelId, slots: 1 , users:[996] },
      { number: 101, type: 'DOUBLE', hotelId: hotelId, slots: 2 },
      { number: 102, type: 'TRIPLE', hotelId: hotelId, slots: 1 , users:[998, 997] },
      { number: 102, type: 'TRIPLE', hotelId: hotelId, slots: 3 },
      { number: 103, type: 'SINGLE', hotelId: hotelId, slots: 0 , users:[999] }
    ]
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
