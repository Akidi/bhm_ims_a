import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
import { tables } from './schema/';

if (!env.WRITE_DATABASE_URL) throw new Error('WRITE_DATABASE_URL is not set');
if (!env.READ_DATABASE_URL) throw new Error('READ_DATABASE_URL is not set');


const writeClient = postgres(env.WRITE_DATABASE_URL);
const readClient = postgres(env.READ_DATABASE_URL);

export const writeDb = drizzle(writeClient, {
	schema: tables
});

export const readDB = drizzle(readClient, {
	schema: tables
});
