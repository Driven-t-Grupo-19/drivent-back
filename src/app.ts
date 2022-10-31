import 'reflect-metadata';
import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import { redis } from '@/config';

import { loadEnv, connectDb, disconnectDB } from '@/config';

loadEnv();

import { handleApplicationErrors } from '@/middlewares';
import { usersRouter, authenticationRouter, eventsRouter, enrollmentsRouter, purchasesRouter, hotelsRouter, roomRouter, oAuthRouter } from '@/routers';

const app = express();
app
  .use(cors())
  .use(express.json())
  .get('/health', (_req, res) => res.send('OK!'))
  .use('/users', usersRouter)
  .use('/auth', authenticationRouter)
  .use('/oauth', oAuthRouter)
  .use('/event', eventsRouter)
  .use('/enrollments', enrollmentsRouter)
  .use('/purchases', purchasesRouter)
  .use('/hotels', hotelsRouter)
  .use(roomRouter)
  .use(handleApplicationErrors);

export function init(): Promise<Express> {
  connectDb();
  redis.connect();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
  redis.quit;
}

export default app;
