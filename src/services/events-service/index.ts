import { redis } from '@/config';
import { notFoundError } from '@/errors';
import eventRepository from '@/repositories/event-repository';
import { exclude } from '@/utils/prisma-utils';
import { Event } from '@prisma/client';
import dayjs from 'dayjs';

async function getFirstEvent(): Promise<GetFirstEventResult> {
  const cacheKey = 'event';
  const cache = await redis.get(cacheKey);
  
  if (cache) {
    const cacheData: Omit<Event, 'createdAt' | 'updatedAt'> = JSON.parse(cache);
    return cacheData;
  } else {
    const event = await eventRepository.findFirst();
    if (!event) throw notFoundError();

    const data = exclude(event, 'createdAt', 'updatedAt');
    redis.set(cacheKey, JSON.stringify(data));
    // redis.setEx(cacheKey, EXPIRATION, JSON.stringify(data));
    return data;
  }
}

export type GetFirstEventResult = Omit<Event, 'createdAt' | 'updatedAt'>;

async function isCurrentEventActive(): Promise<boolean> {
  const cacheKey = 'eventActive?';
  const cache = await redis.get(cacheKey);
  if (cache) {
    const cacheData: boolean = JSON.parse(cache);

    return cacheData;
  } else {
    const event = await eventRepository.findFirst();
    if (!event) return false;

    const now = dayjs();
    const eventStartsAt = dayjs(event.startsAt);
    const eventEndsAt = dayjs(event.endsAt);

    const data = now.isAfter(eventStartsAt) && now.isBefore(eventEndsAt);
    redis.set(cacheKey, JSON.stringify(data));
    // redis.setEx(cacheKey, EXPIRATION, JSON.stringify(data));
    return data;
  }
}

const eventsService = {
  getFirstEvent,
  isCurrentEventActive,
};

export default eventsService;
