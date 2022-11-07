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

  await prisma.$executeRaw`TRUNCATE TABLE hotels RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE accommodations RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE activities RESTART IDENTITY CASCADE`;

  await createHotels();
  await createAcommodations();
  await createActivies();
}

async function createHotels() {
  await prisma.hotels.createMany({
    data: [
      {id:1, name: 'Hotel dos Cria', hotelPicture: 'https://img.a.transfermarkt.technology/portrait/big/353108-1605189960.jpg?lm=1' },
      {id:2, name: 'Hotel dos De Verdade', hotelPicture: 'https://pbs.twimg.com/media/FeBhH7JXgAYbi7x?format=jpg&name=large' },
      {id:3, name: 'Hotel dos Brabo', hotelPicture: 'https://diariodofla.com.br/wp-content/uploads/2022/02/David-Luiz.jpg' }
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
      { number: 101, type: 'DOUBLE', hotelId: hotelId, slots: 1, users: [996] },
      { number: 101, type: 'DOUBLE', hotelId: hotelId, slots: 2 },
      { number: 102, type: 'TRIPLE', hotelId: hotelId, slots: 1, users: [998, 997] },
      { number: 102, type: 'TRIPLE', hotelId: hotelId, slots: 3 },
      { number: 103, type: 'SINGLE', hotelId: hotelId, slots: 0, users: [999] }
    ]
  });
}

async function createActivies() {
  await prisma.activities.createMany({
    data: [
      { name: 'Top 10 Aliens Ben 10', auditorium: 'MAIN', startsAt: '9:00', endsAt: '11:00', day: getDatePlusNDays(2) },
      { name: 'Como zerar Skyrim', auditorium: 'SIDE', startsAt: '12:00', endsAt: '13:00', day: getDatePlusNDays(2) },
      { name: 'Anúncio do LoL 2', auditorium: 'WORKSHOP', startsAt: '14:00', endsAt: '17:00', day: getDatePlusNDays(2) },
      { name: 'Frank parece o Mano Walter?', auditorium: 'MAIN', startsAt: '9:00', endsAt: '10:00', day: getDatePlusNDays(3) },
      { name: 'Top 10 gols do Gabigol', auditorium: 'SIDE', startsAt: '11:00', endsAt: '12:00', day: getDatePlusNDays(3) },
      { name: 'Dudu parece o Kaka?', auditorium: 'WORKSHOP', startsAt: '13:00', endsAt: '16:00', day: getDatePlusNDays(3) },
      { name: 'Aula inicial de JS com Pedrão', auditorium: 'MAIN', startsAt: '9:00', endsAt: '12:00', day: getDatePlusNDays(4) },
      { name: 'Expondo os problemas do React', auditorium: 'SIDE', startsAt: '13:00', endsAt: '15:00', day: getDatePlusNDays(4) },
      { name: 'Como falar em público', auditorium: 'WORKSHOP', startsAt: '17:00', endsAt: '20:00', day: getDatePlusNDays(4) }
    ]
  });
}

function getDatePlusNDays(n: number) {
  const today = new Date();
  return new Date(today.getFullYear(), today.getMonth(), today.getDate() + n);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
